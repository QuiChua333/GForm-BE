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
import { Response } from 'express';
import { UpdateQuestionDTO } from './DTO/update-question.dto';
import { AddQuestionDTO } from './DTO/add-question.dto';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Patch('changeQuestion')
  async changeQuestion(@Res() res: Response, @Body() body: UpdateQuestionDTO) {
    try {
      const question = await this.questionService.changeQuestion(body);
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

  @UseGuards(MyJwtGuard)
  @Patch(':questionId/changeImageQuestion')
  @UseInterceptors(FileInterceptor('file'))
  async changeImageQuestion(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Body() body,
    @Req() req,
    @Param('questionId') questionId: string,
  ) {
    try {
      const { currentImageQuestionUrl } = body;
      if (currentImageQuestionUrl)
        await this.cloudinaryService.destroyFile(currentImageQuestionUrl);
      const response = await this.cloudinaryService.uploadFile(file);
      const newUrl: string = response.secure_url;
      await this.questionService.changeImageQuestion(questionId, {
        image: newUrl,
      });
      res.status(HttpStatus.OK).json({
        message: 'Change image question successfully',
        data: newUrl,
      });
      return response;
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Patch(':questionId/removeImageQuestion')
  async removeImageQuestion(
    @Res() res: Response,
    @Param('questionId') questionId: string,
  ) {
    try {
      await this.questionService.removeImageQuestion(questionId);
      res.status(HttpStatus.OK).json({
        message: 'Remove image question successfully',
      });
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
}
