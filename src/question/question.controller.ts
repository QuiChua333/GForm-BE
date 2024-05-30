import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Response } from 'express';
import { UpdateQuestionDTO } from './DTO/update-question.dto';

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
}
