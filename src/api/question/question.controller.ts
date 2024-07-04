import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { response, Response } from 'express';
import { UpdateQuestionDTO } from './DTO/update-question.dto';
import { AddQuestionDTO } from './DTO/add-question.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectController, InjectRoute } from '@/decorators';
import questionRoutes from './question.routes';

@InjectController({ name: questionRoutes.index })
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @InjectRoute(questionRoutes.changeQuestion)
  async changeQuestion(@Body() body: UpdateQuestionDTO) {
    const question = await this.questionService.changeQuestion(body);
    return question;
  }

  @InjectRoute(questionRoutes.addQuestion)
  async addQuestion(@Body() body: AddQuestionDTO) {
    const { currentQuestionId, position } = body;
    const question = await this.questionService.addQuestion(
      currentQuestionId,
      position,
    );
    return question;
  }

  @InjectRoute(questionRoutes.addFirstQuestion)
  async addFirstQuestion(@Body() { surveyId }: { surveyId: string }) {
    const question = await this.questionService.addFirstQuestion(surveyId);
    return question;
  }

  @InjectRoute(questionRoutes.duplicateQuestion)
  async duplicateQuestion(@Body() { questionId }: { questionId: string }) {
    const question = await this.questionService.duplicateQuestion(questionId);
    return question;
  }

  @InjectRoute(questionRoutes.deleteQuestion)
  async deleteQuestion(@Param('id') questionId: string) {
    const response = await this.questionService.deleteQuestion(questionId);
    return response;
  }

  @InjectRoute(questionRoutes.changeImageQuestion)
  @UseInterceptors(FileInterceptor('file'))
  async changeImageQuestion(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Param('id') questionId: string,
  ) {
    const { currentImageQuestionUrl } = body;
    if (currentImageQuestionUrl)
      await this.cloudinaryService.destroyFile(currentImageQuestionUrl);
    const response = await this.cloudinaryService.uploadFile(file);
    const newUrl: string = response.secure_url;
    await this.questionService.changeImageQuestion(questionId, {
      image: newUrl,
    });
    return newUrl;
  }

  @InjectRoute(questionRoutes.deleteImageQuestion)
  async removeImageQuestion(@Param('questionId') questionId: string) {
    await this.questionService.removeImageQuestion(questionId);
  }
}
