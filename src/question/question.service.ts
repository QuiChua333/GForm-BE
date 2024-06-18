import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './Entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateQuestionDTO } from './DTO/update-question.dto';
import QuestionType from 'src/utils/interface/questionType';
import { Row } from 'src/row/Entity/row';
import { GColumn } from 'src/gcolumn/Entity/gcolumn';
import { Option } from 'src/option/Entity/option.entity';
import { LinearScale } from 'src/linear_scale/Entity/linear_scale';
import { Validation } from 'src/validation/Entity/validation.entity';
import { Survey } from 'src/survey/Entity/survey.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Row)
    private readonly rowRepository: Repository<Row>,

    @InjectRepository(GColumn)
    private readonly columnRepository: Repository<GColumn>,

    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,

    @InjectRepository(LinearScale)
    private readonly linearScaleRepository: Repository<LinearScale>,

    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,

    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async changeQuestion(body: UpdateQuestionDTO) {
    const question = await this.questionRepository.findOne({
      where: {
        id: body.id,
      },
    });

    question.question = body.question ?? question.question;
    question.description = body.description ?? question.description;
    question.isHasDescription =
      body.isHasDescription ?? question.isHasDescription;
    if (body.isHasDescription === false) question.description = '';
    question.isHasOther = body.isHasOther ?? question.isHasOther;
    question.isValidation = body.isValidation ?? question.isValidation;
    if (body.questionType) {
      const oldQuestionType = question.questionType;
      question.questionType = body.questionType;

      switch (body.questionType) {
        case QuestionType.ShortAnswer:

        case QuestionType.Paragraph:
          {
            if (oldQuestionType === QuestionType.Description) {
              question.question = 'Câu hỏi';
            }
            question.isValidation = false;

            if (question.validation) {
              await this.validationRepository.remove(question.validation);
              question.validation = null;
            }

            if (question.linearScale) {
              await this.linearScaleRepository.remove(question.linearScale);
              question.linearScale = null;
            }
            if (question.rows && question.rows.length > 0) {
              await this.rowRepository.remove(question.rows);
              question.rows = null;
            }

            if (question.gcolumns && question.gcolumns.length > 0) {
              await this.columnRepository.remove(question.gcolumns);
              question.gcolumns = null;
            }
            if (question.options && question.options.length > 0) {
              await this.optionRepository.remove(question.options);
              question.options = null;
            }

            question.isHasOther = false;
          }
          break;
        case QuestionType.Checkbox:
        case QuestionType.RadioButton: {
          if (oldQuestionType === QuestionType.Description) {
            question.question = 'Câu hỏi';
          }
          question.isValidation = false;

          if (question.validation) {
            await this.validationRepository.remove(question.validation);
            question.validation = null;
          }

          if (question.linearScale) {
            await this.linearScaleRepository.remove(question.linearScale);
            question.linearScale = null;
          }
          if (question.rows && question.rows.length > 0) {
            await this.rowRepository.remove(question.rows);
            question.rows = null;
          }

          if (question.gcolumns && question.gcolumns.length > 0) {
            await this.columnRepository.remove(question.gcolumns);
            question.gcolumns = null;
          }

          if (!question.options || question.options.length === 0) {
            const newOption = new Option();
            newOption.optionText = 'Lựa chọn 1';
            question.options = [newOption];
          }

          break;
        }
        case QuestionType.Dropdown: {
          if (oldQuestionType === QuestionType.Description) {
            question.question = 'Câu hỏi';
          }
          question.isValidation = false;
          if (question.validation) {
            await this.validationRepository.remove(question.validation);
            question.validation = null;
          }

          if (question.linearScale) {
            await this.linearScaleRepository.remove(question.linearScale);
            question.linearScale = null;
          }
          if (question.rows && question.rows.length > 0) {
            await this.rowRepository.remove(question.rows);
            question.rows = null;
          }

          if (question.gcolumns && question.gcolumns.length > 0) {
            await this.columnRepository.remove(question.gcolumns);
            question.gcolumns = null;
          }

          question.isHasOther = false;
          if (question?.options?.length === 0) {
            const newOption = new Option();
            newOption.optionText = 'Lựa chọn 1';
            question.options = [newOption];
          }
          break;
        }
        case QuestionType.LinearScale: {
          if (oldQuestionType === QuestionType.Description) {
            question.question = 'Câu hỏi';
          }
          question.isValidation = false;
          if (question.validation) {
            await this.validationRepository.remove(question.validation);
            question.validation = null;
          }

          if (question.rows && question.rows.length > 0) {
            await this.rowRepository.remove(question.rows);
            question.rows = null;
          }

          if (question.gcolumns && question.gcolumns.length > 0) {
            await this.columnRepository.remove(question.gcolumns);
            question.gcolumns = null;
          }
          if (question.options && question.options.length > 0) {
            await this.optionRepository.remove(question.options);
            question.options = null;
          }

          question.isHasOther = false;
          const linearScale = new LinearScale();
          linearScale.min = 1;
          linearScale.max = 5;
          linearScale.leftLabel = '';
          linearScale.rightLabel = '';
          question.linearScale = linearScale;
          break;
        }
        case QuestionType.RadioButtonGrid: {
          if (oldQuestionType === QuestionType.Description) {
            question.question = 'Câu hỏi';
          }
          question.isValidation = false;
          if (question.validation) {
            await this.validationRepository.remove(question.validation);
            question.validation = null;
          }

          if (question.linearScale) {
            await this.linearScaleRepository.remove(question.linearScale);
            question.linearScale = null;
          }

          if (question.options && question.options.length > 0) {
            await this.optionRepository.remove(question.options);
            question.options = null;
          }

          question.isHasOther = false;
          const newRow = new Row();
          newRow.rowContent = 'Hàng 1';
          question.rows = [newRow];
          const newColumn = new GColumn();
          newColumn.gcolumnContent = 'Cột 1';
          question.gcolumns = [newColumn];

          break;
        }
        case QuestionType.Description: {
          question.question = 'Tiêu đề';
          question.isValidation = false;
          if (question.validation) {
            await this.validationRepository.remove(question.validation);
            question.validation = null;
          }

          if (question.linearScale) {
            await this.linearScaleRepository.remove(question.linearScale);
            question.linearScale = null;
          }
          if (question.rows && question.rows.length > 0) {
            await this.rowRepository.remove(question.rows);
            question.rows = null;
          }

          if (question.gcolumns && question.gcolumns.length > 0) {
            await this.columnRepository.remove(question.gcolumns);
            question.gcolumns = null;
          }
          if (question.options && question.options.length > 0) {
            await this.optionRepository.remove(question.options);
            question.options = null;
          }

          question.isHasOther = false;
          question.isHasDescription = true;
          break;
        }
      }
    }
    question.isRequired = body.isRequired ?? question.isRequired;

    await this.questionRepository.save(question);
    return question;
  }

  async addQuestion(currentQuestionId: string, position: 'before' | 'after') {
    const currentQuestion = await this.questionRepository.findOne({
      where: {
        id: currentQuestionId,
      },
      relations: ['survey'],
    });
    let addQuestion = new Question();
    addQuestion.question = 'Câu hỏi';
    addQuestion.image = '';
    addQuestion.description = '';
    addQuestion.isHasDescription = false;
    addQuestion.isRequired = false;
    addQuestion.questionType = QuestionType.ShortAnswer;
    addQuestion.isValidation = false;
    addQuestion.isHasOther = false;
    addQuestion.nextQuestionId = '';
    addQuestion.previousQuestionId = '';
    addQuestion.survey = currentQuestion.survey;

    const responseAddQuestion = await this.questionRepository.save(addQuestion);
    if (position === 'after') {
      if (
        !currentQuestion.nextQuestionId ||
        currentQuestion.nextQuestionId === ''
      ) {
        currentQuestion.nextQuestionId = responseAddQuestion.id;
        responseAddQuestion.previousQuestionId = currentQuestion.id;

        await this.questionRepository.save(currentQuestion);
        addQuestion = await this.questionRepository.save(responseAddQuestion);
      } else {
        const nextCurrentQuestion = await this.questionRepository.findOne({
          where: { id: currentQuestion.nextQuestionId },
        });
        currentQuestion.nextQuestionId = responseAddQuestion.id;
        responseAddQuestion.previousQuestionId = currentQuestion.id;
        responseAddQuestion.nextQuestionId = nextCurrentQuestion.id;
        nextCurrentQuestion.previousQuestionId = responseAddQuestion.id;
        await this.questionRepository.save(currentQuestion);
        await this.questionRepository.save(nextCurrentQuestion);
        addQuestion = await this.questionRepository.save(responseAddQuestion);
      }
    } else if (position === 'before') {
      if (
        !currentQuestion.previousQuestionId ||
        currentQuestion.previousQuestionId === ''
      ) {
        currentQuestion.previousQuestionId = responseAddQuestion.id;
        responseAddQuestion.nextQuestionId = currentQuestion.id;
        await this.questionRepository.save(currentQuestion);
        addQuestion = await this.questionRepository.save(responseAddQuestion);
      } else {
        const previousCurrentQuestion = await this.questionRepository.findOne({
          where: { id: currentQuestion.previousQuestionId },
        });
        previousCurrentQuestion.nextQuestionId = responseAddQuestion.id;
        responseAddQuestion.previousQuestionId = previousCurrentQuestion.id;
        responseAddQuestion.nextQuestionId = currentQuestion.id;
        currentQuestion.previousQuestionId = responseAddQuestion.id;
        await this.questionRepository.save(previousCurrentQuestion);

        await this.questionRepository.save(currentQuestion);
        addQuestion = await this.questionRepository.save(responseAddQuestion);
      }
    }
    return addQuestion;
  }
  async addFirstQuestion(surveyId: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
    });
    if (!survey) throw new Error('Khảo sát không tồn tại');
    const addQuestion = new Question();
    addQuestion.question = '';
    addQuestion.image = '';
    addQuestion.description = '';
    addQuestion.isHasDescription = false;
    addQuestion.isRequired = false;
    addQuestion.questionType = QuestionType.ShortAnswer;
    addQuestion.isValidation = false;
    addQuestion.isHasOther = false;
    addQuestion.nextQuestionId = '';
    addQuestion.previousQuestionId = '';
    addQuestion.survey = survey;
    return await this.questionRepository.save(addQuestion);
  }

  async duplicateQuestion(questionId: string) {
    const currentQuestion = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
      relations: ['survey'],
      order: {
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
    const newQuestion = await this.copyFrom(currentQuestion);
    return newQuestion;
  }
  async deleteQuestion(questionId: string) {
    const currentQuestion = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    if (currentQuestion.image) {
      await this.cloudinaryService.destroyFile(currentQuestion.image);
    }
    if (
      !currentQuestion.previousQuestionId &&
      !currentQuestion.nextQuestionId
    ) {
      await this.questionRepository.remove(currentQuestion);
    } else if (!currentQuestion.previousQuestionId) {
      const nextQuestion = await this.questionRepository.findOne({
        where: {
          id: currentQuestion.nextQuestionId,
        },
      });
      nextQuestion.previousQuestionId = '';
      await this.questionRepository.save(nextQuestion);
      await this.questionRepository.remove(currentQuestion);
    } else if (!currentQuestion.nextQuestionId) {
      const previousQuestion = await this.questionRepository.findOne({
        where: {
          id: currentQuestion.previousQuestionId,
        },
      });
      previousQuestion.nextQuestionId = '';
      await this.questionRepository.save(previousQuestion);
      await this.questionRepository.remove(currentQuestion);
    } else {
      const previousQuestion = await this.questionRepository.findOne({
        where: {
          id: currentQuestion.previousQuestionId,
        },
      });
      const nextQuestion = await this.questionRepository.findOne({
        where: {
          id: currentQuestion.nextQuestionId,
        },
      });
      previousQuestion.nextQuestionId = nextQuestion.id;
      nextQuestion.previousQuestionId = previousQuestion.id;
      await this.questionRepository.save(previousQuestion);
      await this.questionRepository.save(nextQuestion);
      await this.questionRepository.remove(currentQuestion);
    }
    return currentQuestion;
  }

  async copyFrom(question: Question) {
    let newQuestion = new Question();
    newQuestion.question = question.question;
    newQuestion.description = question.description;
    newQuestion.isRequired = question.isRequired;
    newQuestion.isHasDescription = question.isHasDescription;
    newQuestion.questionType = question.questionType;
    newQuestion.isValidation = question.isValidation;
    newQuestion.isHasOther = question.isHasOther;
    newQuestion.survey = question.survey;
    newQuestion.nextQuestionId = '';
    newQuestion.previousQuestionId = '';
    if (question.image) {
      const response = await this.cloudinaryService.uploadFromUrl(
        question.image,
      );
      newQuestion.image = response.secure_url;
    }
    if (question.validation) {
      const validation = new Validation();
      validation.conditionName = question.validation.conditionName;
      validation.conditionValue1 = question.validation.conditionValue1;
      validation.conditionValue2 = question.validation.conditionValue2;
      newQuestion.validation = validation;
    }

    if (question.linearScale) {
      const linearScale = new LinearScale();
      linearScale.min = question.linearScale.min;
      linearScale.max = question.linearScale.max;
      linearScale.leftLabel = question.linearScale.leftLabel;
      linearScale.rightLabel = question.linearScale.rightLabel;
      newQuestion.linearScale = linearScale;
    }

    if (question.options) {
      const options: Option[] = [];
      for (const option of question.options) {
        const newOption = new Option();
        newOption.optionText = option.optionText;
        options.push(newOption);
      }
      newQuestion.options = options;
    }

    if (question.rows) {
      const rows: Row[] = [];
      for (const row of question.rows) {
        const newRow = new Row();
        newRow.rowContent = row.rowContent;
        rows.push(row);
      }
      newQuestion.rows = rows;
    }

    if (question.gcolumns) {
      const gcolmns: GColumn[] = [];
      for (const gcolumn of question.gcolumns) {
        const newGColumn = new GColumn();
        newGColumn.gcolumnContent = gcolumn.gcolumnContent;
        gcolmns.push(gcolumn);
      }
      newQuestion.gcolumns = gcolmns;
    }

    newQuestion = await this.questionRepository.save(newQuestion);

    if (!question.nextQuestionId) {
      question.nextQuestionId = newQuestion.id;
      newQuestion.previousQuestionId = question.id;

      await this.questionRepository.save(question);
      return await this.questionRepository.save(newQuestion);
    } else {
      const nextQuestion = await this.questionRepository.findOne({
        where: {
          id: question.nextQuestionId,
        },
      });
      question.nextQuestionId = newQuestion.id;
      newQuestion.previousQuestionId = question.id;
      newQuestion.nextQuestionId = nextQuestion.id;
      nextQuestion.previousQuestionId = newQuestion.id;
      await this.questionRepository.save(question);
      await this.questionRepository.save(nextQuestion);
      return await this.questionRepository.save(newQuestion);
    }
  }

  async changeImageQuestion(questionId: string, body: { image: string }) {
    await this.questionRepository.update(
      {
        id: questionId,
      },
      body,
    );
  }
  async removeImageQuestion(questionId: string) {
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    if (question.image) {
      await this.cloudinaryService.destroyFile(question.image);
      question.image = '';
    }
    await this.questionRepository.save(question);
  }
}
