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
  ) {}

  async changeQuestion(id: string, body: UpdateQuestionDTO) {
    const question = await this.questionRepository.findOne({
      where: {
        id: id,
      },
    });
    question.question = body.question ?? question.question;
    question.description = body.description ?? question.description;
    question.isHasDescription =
      body.isHasDescription ?? question.isHasDescription;
    if (body.isHasDescription === false) question.description = '';
    question.isRequired = body.isRequired ?? question.isRequired;
    question.isValidation = body.isValidation ?? question.isValidation;
    question.questionType = body.questionType ?? question.questionType;
    if (body.questionType) {
      const questionType = body.questionType;
      if (body.questionType) {
        const questionType = body.questionType;
        switch (questionType) {
          case QuestionType.ShortAnswer:
          case QuestionType.Paragraph:
            {
              question.isValidation = false;

              const validation = await this.validationRepository.findOne({
                where: { question: { id: question.id } },
              });
              if (validation) {
                await this.validationRepository.remove(validation);
              }

              const linearScale = await this.linearScaleRepository.findOne({
                where: { question: { id: question.id } },
              });
              if (linearScale) {
                await this.linearScaleRepository.remove(linearScale);
              }
              const rowsToDelete = await this.rowRepository.find({
                where: { question: { id: question.id } },
              });
              if (rowsToDelete) {
                await this.rowRepository.remove(rowsToDelete);
              }
              const columnsToDelete = await this.columnRepository.find({
                where: { question: { id: question.id } },
              });
              if (columnsToDelete) {
                await this.columnRepository.remove(columnsToDelete);
              }
              const optionsToDelete = await this.optionRepository.find({
                where: { question: { id: question.id } },
              });

              if (optionsToDelete) {
                await this.optionRepository.remove(optionsToDelete);
                console.log('da xoa');
                const optionsToDelete2 = await this.optionRepository.find({
                  where: { question: { id: question.id } },
                });

                console.log(optionsToDelete2);
              }

              question.isHasOther = false;
            }
            break;
          case QuestionType.Checkbox:
          case QuestionType.RadioButton: {
            question.isValidation = false;
            const validation = await this.validationRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (validation) {
              await this.validationRepository.remove(validation);
            }

            const linearScale = await this.linearScaleRepository.findOne({
              where: { question: { id: question.id } },
            });

            if (linearScale) {
              await this.linearScaleRepository.remove(linearScale);
            }

            const rowsToDelete = await this.rowRepository.find({
              where: { question: { id: question.id } },
            });

            if (rowsToDelete) {
              await this.rowRepository.remove(rowsToDelete);
            }

            const columnsToDelete = await this.columnRepository.find({
              where: { question: { id: question.id } },
            });

            if (columnsToDelete) {
              await this.columnRepository.remove(columnsToDelete);
            }

            if (question?.options?.length === 0) {
              const newOption = new Option();
              newOption.optionText = 'Lựa chọn 1';
              question.options = [newOption];
            }

            break;
          }
          case QuestionType.Dropdown: {
            question.isValidation = false;
            const validation = await this.validationRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (validation) {
              await this.validationRepository.remove(validation);
            }

            const linearScale = await this.linearScaleRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (linearScale) {
              await this.linearScaleRepository.remove(linearScale);
            }

            const rowsToDelete = await this.rowRepository.find({
              where: { question: { id: question.id } },
            });

            if (rowsToDelete) {
              await this.rowRepository.remove(rowsToDelete);
            }

            const columnsToDelete = await this.columnRepository.find({
              where: { question: { id: question.id } },
            });
            if (columnsToDelete) {
              await this.columnRepository.remove(columnsToDelete);
            }

            question.isHasOther = false;
            if (question?.options?.length === 0) {
              const newOption = new Option();
              newOption.optionText = 'Lựa chọn 1';
              question.options = [newOption];
              console.log(222);
            }
            break;
          }
          case QuestionType.LinearScale: {
            question.isValidation = false;
            const validation = await this.validationRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (validation) {
              await this.validationRepository.remove(validation);
            }

            const rowsToDelete = await this.rowRepository.find({
              where: { question: { id: question.id } },
            });
            if (rowsToDelete) {
              await this.rowRepository.remove(rowsToDelete);
            }

            const columnsToDelete = await this.columnRepository.find({
              where: { question: { id: question.id } },
            });
            if (columnsToDelete) {
              await this.columnRepository.remove(columnsToDelete);
            }

            const optionsToDelete = await this.optionRepository.find({
              where: { question: { id: question.id } },
            });
            if (optionsToDelete) {
              await this.optionRepository.remove(optionsToDelete);
            }

            question.isHasOther = false;
            const linearScale = new LinearScale();
            linearScale.min = 1;
            linearScale.max = 10;
            linearScale.leftLabel = '';
            linearScale.rightLabel = '';
            question.linearScale = linearScale;
            break;
          }
          case QuestionType.RadioButtonGrid: {
            question.isValidation = false;
            const validation = await this.validationRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (validation) {
              await this.validationRepository.remove(validation);
            }

            const optionsToDelete = await this.optionRepository.find({
              where: { question: { id: question.id } },
            });
            if (optionsToDelete) {
              await this.optionRepository.remove(optionsToDelete);
            }

            const linearScale = await this.linearScaleRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (linearScale) {
              await this.linearScaleRepository.remove(linearScale);
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
            question.isValidation = false;
            const validation = await this.validationRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (validation) {
              await this.validationRepository.remove(validation);
            }

            const linearScale = await this.linearScaleRepository.findOne({
              where: { question: { id: question.id } },
            });
            if (linearScale) {
              await this.linearScaleRepository.remove(linearScale);
            }
            const rowsToDelete = await this.rowRepository.find({
              where: { question: { id: question.id } },
            });
            if (rowsToDelete) {
              await this.rowRepository.remove(rowsToDelete);
            }
            const columnsToDelete = await this.columnRepository.find({
              where: { question: { id: question.id } },
            });
            if (columnsToDelete) {
              await this.columnRepository.remove(columnsToDelete);
            }
            const optionsToDelete = await this.optionRepository.find({
              where: { question: { id: question.id } },
            });
            if (optionsToDelete) {
              await this.optionRepository.remove(optionsToDelete);
            }

            question.isHasOther = false;
            question.isHasDescription = true;
            break;
          }
        }
      }
    }
    await this.questionRepository.save(question);
    return question;
  }
}
