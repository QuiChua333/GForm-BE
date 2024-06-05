import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './Entity/response';
import { Repository } from 'typeorm';
import { CreateResponseDTO } from './DTO/create-response.dto';
import { Answer } from 'src/answer/Entity/answer';
import { MultiChooseOption } from 'src/multi-choose-option/Entity/multiChooseOption';
import { MultiChooseGrid } from 'src/multi-choose-grid/Entity/multiChooseGrid';
import { Question } from 'src/question/Entity/question.entity';

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
  ) {}

  async createResponse(body: CreateResponseDTO) {
    const newResponse = new Response();
    newResponse.submissionDate = new Date();
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

      if (tmpAnswer.linearValue) {
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
}
