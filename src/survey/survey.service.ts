import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';
import { Survey } from './Entity/survey.entity';
import { Question } from 'src/question/Entity/question.entity';
import QuestionType from 'src/utils/interface/questionType';
import { UpdateSurveyDTO } from './DTO/update-survey.dto';
import { User } from 'src/user/Entity/user.entity';
const LIMIT: number = 10;
const defaultBackground =
  'https://res.cloudinary.com/demo-golden/image/upload/v1718591862/DEMO1/ekqfqrlfh0pu8ddfml9j.jpg';
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

  async getSurveyById(id: string, userId: string) {
    const survey = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoin('survey.owner', 'owner')
      .leftJoinAndSelect('survey.surveyShares', 'surveyShares')
      .addSelect(['owner.id', 'owner.fullName'])
      .where('survey.id = :id', { id })
      .getOne();

    let isShareEdit: boolean = false;
    let isOwner: boolean = true;
    if (survey.owner.id !== userId) {
      isOwner = false;
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      const surveyShare = survey.surveyShares.find(
        (element) => element.email === user.email,
      );
      if (!surveyShare) throw new ForbiddenException('No permission');
      isShareEdit = surveyShare.isEdit;
    }
    survey.questions = await this.getOrderedQuestions(id);
    return { ...survey, isOwner, isShareEdit };
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
    newSurvey.backgroundImage = defaultBackground;
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

    const totalQueryBuilder = this.surveyRepository
      .createQueryBuilder('survey')
      .where('survey.ownerId = :userId', { userId });

    if (query.searchString.trim()) {
      const searchString = query.searchString.trim().toLowerCase();
      queryBuilder.andWhere('LOWER(survey.title) LIKE :searchString', {
        searchString: `%${searchString}%`,
      });
      totalQueryBuilder.andWhere('LOWER(survey.title) LIKE :searchString', {
        searchString: `%${searchString}%`,
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

  async getSharedUserSurvey(surveyId: string, userId: string) {
    const survey = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoin('survey.owner', 'owner')
      .leftJoinAndSelect('survey.surveyShares', 'surveyShares')
      .leftJoin('surveyShares.user', 'user')
      .addSelect(['owner.id', 'owner.fullName', 'owner.email', 'owner.avatar'])
      .addSelect(['user.id', 'user.fullName', 'user.email', 'user.avatar'])
      .where('survey.id = :id', { id: surveyId })
      .getOne();
    let isShareEdit: boolean = false;
    let isOwner: boolean = true;
    if (survey.owner.id !== userId) {
      isOwner = false;
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });
      const surveyShare = survey.surveyShares.find(
        (element) => element.email === user.email,
      );
      if (!surveyShare) throw new ForbiddenException('No permission');
      isShareEdit = surveyShare.isEdit;
    }
    return {
      surveyId: survey.id,
      isOwner,
      isShareEdit,
      owner: {
        ...survey.owner,
      },
      sharedUsers: [...survey.surveyShares].map((item) => {
        return {
          email: item.email,
          isAccept: item.isAccept,
          isEdit: item.isEdit,
          sharedId: item.id,
          userId: item.user?.id || '',
          fullName: item.user?.fullName || '',
          avatar: item.user?.avatar || '',
        };
      }),
    };
  }

  async changeBackgroundSurvey(
    surveyId: string,
    body: { backgroundImage: string },
  ) {
    await this.surveyRepository.update(
      {
        id: surveyId,
      },
      body,
    );
  }

  async checkOwner(userId: string, surveyId: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
      relations: ['owner'],
    });
    if (survey.owner.id !== userId)
      throw new ForbiddenException('No permission');
  }
}
