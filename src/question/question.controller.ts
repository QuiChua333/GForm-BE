import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Response } from 'express';
import { UpdateQuestionDTO } from './DTO/update-question.dto';
import { AddQuestionDTO } from './DTO/add-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Patch('changeQuestion/:id')
  async changeQuestion(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UpdateQuestionDTO,
  ) {
    try {
      const question = await this.questionService.changeQuestion(id, body);
      res.status(HttpStatus.OK).json({
        message: 'Update question successfully',
        data: question,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('addQuestion')
  async addQuestion(@Res() res: Response, @Body() body: AddQuestionDTO) {
    try {
      const { currentQuestionId, position } = body;
      const question = await this.questionService.addQuestion(
        currentQuestionId,
        position,
      );
      res.status(HttpStatus.OK).json({
        message: 'Add question successfully',
        data: question,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('addFirstQuestion')
  async addFirstQuestion(
    @Res() res: Response,
    @Body() { surveyId }: { surveyId: string },
  ) {
    try {
      const question = await this.questionService.addFirstQuestion(surveyId);
      res.status(HttpStatus.OK).json({
        message: 'Add question successfully',
        data: question,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('duplicateQuestion')
  async duplicateQuestion(
    @Res() res: Response,
    @Body() { questionId }: { questionId: string },
  ) {
    try {
      const question = await this.questionService.duplicateQuestion(questionId);
      res.status(HttpStatus.OK).json({
        message: 'Duplicate question successfully',
        data: question,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteQuestion/:questionId')
  async deleteQuestion(
    @Res() res: Response,
    @Param('questionId') questionId: string,
  ) {
    try {
      const response = await this.questionService.deleteQuestion(questionId);
      res.status(HttpStatus.OK).json({
        message: 'Delete question successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
