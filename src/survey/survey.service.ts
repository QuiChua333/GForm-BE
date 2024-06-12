import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';
import { Survey } from './Entity/survey.entity';
import { Question } from 'src/question/Entity/question.entity';
import QuestionType from 'src/utils/interface/questionType';
import { UpdateSurveyDTO } from './DTO/update-survey.dto';
import { User } from 'src/user/Entity/user.entity';
const LIMIT: number = 10;
@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getSurveyById(id: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: id,
      },
    });
    survey.questions = await this.getOrderedQuestions(id);

    return survey;
  }

  async createSurvey(userId: string) {
    const newSurvey = new Survey();
    newSurvey.ownerId = userId;
    newSurvey.description = '';
    newSurvey.title = 'Tiêu đề khảo sát';
    newSurvey.isAccepting = true;
    const questions: Question[] = [];
    const newQuestion = new Question();
    newQuestion.question = 'Câu hỏi';
    newQuestion.image = '';
    newQuestion.description = '';
    newQuestion.isHasDescription = false;
    newQuestion.isRequired = false;
    newQuestion.questionType = QuestionType.ShortAnswer;
    newQuestion.isValidation = false;
    newQuestion.isHasOther = false;
    newQuestion.nextQuestionId = '';
    newQuestion.previousQuestionId = '';
    questions.push(newQuestion);
    newSurvey.questions = questions;
    return await this.surveyRepository.save(newSurvey);
  }

  async changeSurvey(body: UpdateSurveyDTO) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: body.id,
      },
    });
    survey.description = body.description ?? survey.description;
    survey.title = body.title ?? survey.title;
    survey.isAccepting = body.isAccepting ?? survey.isAccepting;
    return await this.surveyRepository.save(survey);
  }

  async getOrderedQuestions(surveyId: string): Promise<Question[]> {
    const orderedQuestions: Question[] = [];
    let firstQuestion = await this.questionRepository.findOne({
      where: {
        survey: {
          id: surveyId,
        },
        previousQuestionId: '',
      },
      order: {
        create_at: 'ASC',
        options: {
          create_at: 'ASC',
        },
        rows: {
          create_at: 'ASC',
        },
        gcolumns: {
          create_at: 'ASC',
        },
      },
    });

    while (firstQuestion) {
      orderedQuestions.push(firstQuestion);
      if (firstQuestion.nextQuestionId) {
        firstQuestion = await this.questionRepository.findOne({
          where: { id: firstQuestion.nextQuestionId },
          order: {
            create_at: 'ASC',
            options: {
              create_at: 'ASC',
            },
            rows: {
              create_at: 'ASC',
            },
            gcolumns: {
              create_at: 'ASC',
            },
          },
        });
      } else {
        firstQuestion = null;
      }
    }

    return orderedQuestions;
  }
  async getSurveysOfCurrentUser(
    userId: string,
    query: { page: string; status: string; searchString: string },
  ) {
    const pageParam = Number(query.page);

    const queryBuilder = this.surveyRepository
      .createQueryBuilder('survey')
      .where('survey.ownerId = :userId', { userId })
      .loadRelationCountAndMap('survey.questionsCount', 'survey.questions')
      .loadRelationCountAndMap('survey.responsesCount', 'survey.responses')
      .orderBy('survey.create_at', 'DESC')
      .skip(pageParam * LIMIT)
      .take(LIMIT);

    const totalQueryBuilder = await this.surveyRepository
      .createQueryBuilder('survey')
      .where('survey.ownerId = :userId', { userId });

    if (query.searchString.trim()) {
      queryBuilder.andWhere('survey.title LIKE :searchString', {
        searchString: `%${query.searchString}%`,
      });
      totalQueryBuilder.andWhere('survey.title LIKE :searchString', {
        searchString: `%${query.searchString}%`,
      });
    }
    if (query.status !== '0') {
      const isAccepting = query.status === '1';
      queryBuilder.andWhere('survey.isAccepting = :isAccepting', {
        isAccepting: isAccepting,
      });
      totalQueryBuilder.andWhere('survey.isAccepting = :isAccepting', {
        isAccepting: isAccepting,
      });
    }

    const surveys = await queryBuilder.getMany();
    const totalSurveys = await queryBuilder.getCount();

    const nextCursor =
      (pageParam + 1) * LIMIT < totalSurveys ? (pageParam + 1) * LIMIT : null;
    return { surveys, nextCursor, totalSurveys };
  }
}
