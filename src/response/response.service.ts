import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './Entity/response';
import { Repository } from 'typeorm';
import { CreateResponseDTO } from './DTO/create-response.dto';
import { Answer } from 'src/answer/Entity/answer';
import { MultiChooseOption } from 'src/multi-choose-option/Entity/multiChooseOption';
import { MultiChooseGrid } from 'src/multi-choose-grid/Entity/multiChooseGrid';
import { Question } from 'src/question/Entity/question.entity';
import { Survey } from 'src/survey/Entity/survey.entity';
import QuestionResponseInterface from 'src/utils/interface/questionResponseInterface';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,

    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @InjectRepository(MultiChooseOption)
    private readonly multiChooseOptionRepository: Repository<MultiChooseOption>,

    @InjectRepository(MultiChooseGrid)
    private readonly multiChooseGridRepository: Repository<MultiChooseGrid>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  async createResponse(body: CreateResponseDTO) {
    const newResponse = new Response();
    newResponse.submissionDate = new Date();
    const survey = await this.surveyRepository.findOne({
      where: {
        id: body.surveyId,
      },
    });
    newResponse.survey = survey;
    const answers: Answer[] = [];
    for (let i = 0; i < body.answers.length; i++) {
      const tmpAnswer = body.answers[i];
      const newAnswer = new Answer();
      let isHasResponseAnswer: boolean = false;
      if (tmpAnswer.answerText) {
        newAnswer.answerText = tmpAnswer.answerText;
        isHasResponseAnswer = true;
      }

      if (tmpAnswer.singleOption) {
        newAnswer.singleOption = tmpAnswer.singleOption;
        isHasResponseAnswer = true;
      }

      if (tmpAnswer.otherText) {
        newAnswer.otherText = tmpAnswer.otherText;
        isHasResponseAnswer = true;
      }

      if (
        tmpAnswer.linearValue !== undefined &&
        tmpAnswer.linearValue !== null
      ) {
        newAnswer.linearValue = tmpAnswer.linearValue;
        isHasResponseAnswer = true;
      }

      if (tmpAnswer.isChooseOther) {
        newAnswer.isChooseOther = tmpAnswer.isChooseOther;
        isHasResponseAnswer = true;
      }

      if (
        tmpAnswer.multiChooseOption &&
        tmpAnswer.multiChooseOption.length > 0
      ) {
        isHasResponseAnswer = true;
        const multiChooseOption: MultiChooseOption[] = [];
        for (let j = 0; j < tmpAnswer.multiChooseOption.length; j++) {
          const tmpMultiChooseOption = tmpAnswer.multiChooseOption[j];
          const newMultiChooseOption = new MultiChooseOption();
          newMultiChooseOption.option = tmpMultiChooseOption;
          multiChooseOption.push(newMultiChooseOption);
        }
        newAnswer.multiChooseOption = multiChooseOption;
      }
      if (tmpAnswer.multiChooseGrid && tmpAnswer.multiChooseGrid.length > 0) {
        let isHasResponseGrid = tmpAnswer.multiChooseGrid.some(
          (choose) => choose.gcolumn !== '',
        );
        if (isHasResponseGrid) {
          isHasResponseAnswer = true;
          const multiChooseGrid: MultiChooseGrid[] = [];
          for (let j = 0; j < tmpAnswer.multiChooseGrid.length; j++) {
            const tmpMultiChooseGrid = tmpAnswer.multiChooseGrid[j];
            const newMultiChooseGrid = new MultiChooseGrid();
            newMultiChooseGrid.row = tmpMultiChooseGrid.row;
            newMultiChooseGrid.gcolumn = tmpMultiChooseGrid.gcolumn;
            multiChooseGrid.push(newMultiChooseGrid);
          }
          newAnswer.multiChooseGrid = multiChooseGrid;
        }
      }
      if (isHasResponseAnswer) {
        const question = await this.questionRepository.findOne({
          where: {
            id: tmpAnswer.questionId,
          },
        });
        newAnswer.question = question;
        answers.push(newAnswer);
      }
    }
    if (answers.length > 0) {
      newResponse.answers = answers;
    }
    return await this.responseRepository.save(newResponse);
  }

  async getResponseSurvey(surveyId: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
    });
    const quantityOfResponses = await this.responseRepository.count({
      where: {
        survey: {
          id: surveyId,
        },
      },
    });

    const questions = await this.getOrderedQuestions(surveyId);

    // Khởi tạo mảng kết quả
    const questionResponses: QuestionResponseInterface[] = [];

    // Duyệt qua từng câu hỏi
    for (const question of questions) {
      // Tạo đối tượng response cho câu hỏi
      const questionResponse: QuestionResponseInterface = {
        questionId: question.id,
        questionContent: question.question,
        questionType: question.questionType,
        textResponses: [],
        optionReponses: [],
        rowGColumnResponses: [],
      };

      // Lấy tất cả các option từ câu hỏi
      let options = question.options.map((option) => option.optionText);

      if (question.isHasOther) {
        // Lấy tất cả các otherText từ các câu trả lời
        const otherTexts = await this.answerRepository
          .createQueryBuilder('answer')
          .select('DISTINCT answer.otherText', 'otherText')
          .where('answer.questionId = :questionId', { questionId: question.id })
          .andWhere('answer.isChooseOther = true')
          .getRawMany();

        // Loại bỏ các otherText trùng lặp và không phải là option
        const uniqueOtherTexts = otherTexts.map(
          (otherText) => otherText.otherText,
        );
        options = options.concat(
          uniqueOtherTexts.filter((otherText) => !options.includes(otherText)),
        );
      }

      // Lấy tất cả các hàng từ câu hỏi
      const rows = question.rows.map((row) => row.rowContent);

      // Lấy tất cả các cột từ câu hỏi
      const gcolumns = question.gcolumns.map(
        (gcolumn) => gcolumn.gcolumnContent,
      );

      // Lấy tất cả các câu trả lời liên quan đến câu hỏi
      const answers = await this.answerRepository.find({
        where: { question: { id: question.id } },
        relations: ['multiChooseOption', 'multiChooseGrid'],
      });

      questionResponse.textResponses = answers
        .map((answer) => answer.answerText)
        .filter((text) => text !== null && text !== undefined);

      // Thống kê số lượng câu trả lời cho mỗi option
      questionResponse.optionReponses = options.map((option) => {
        const quantity = answers.filter(
          (answer) =>
            answer.multiChooseOption.some((opt) => opt.option === option) ||
            (answer.isChooseOther && answer.otherText === option) ||
            answer.singleOption === option,
        ).length;
        return { optionContent: option, quantity };
      });

      // Thống kê số lượng câu trả lời cho mỗi hàng và cột
      questionResponse.rowGColumnResponses = rows.map((row) => ({
        row: row,
        gcolumns: gcolumns.map((gcolumn) => ({
          gcolumnContent: gcolumn,
          quantity: answers.filter((answer) =>
            answer.multiChooseGrid.some(
              (grid) => grid.row === row && grid.gcolumn === gcolumn,
            ),
          ).length,
        })),
      }));

      if (question.linearScale) {
        const min = question.linearScale.min;
        const max = question.linearScale.max;
        const linearValueCounts: number[] = new Array(max - min + 1).fill(0);
        answers.forEach((answer) => {
          if (
            answer.linearValue !== null &&
            answer.linearValue !== undefined &&
            answer.linearValue >= min &&
            answer.linearValue <= max
          ) {
            linearValueCounts[answer.linearValue - min]++;
          }
        });
        const linearResponses: {
          value: number;
          quantity: number;
        }[] = linearValueCounts.map((count, index) => ({
          value: min + index,
          quantity: count,
        }));
        questionResponse.linearResponses = linearResponses;
      }
      questionResponse.numberOfResponses = answers.length;
      if (questionResponse.numberOfResponses > 0) {
        // Thêm questionResponse vào mảng kết quả
        questionResponses.push(questionResponse);
      }
    }

    return {
      survey,
      quantityOfResponses,
      questionResponses,
    };
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
}
