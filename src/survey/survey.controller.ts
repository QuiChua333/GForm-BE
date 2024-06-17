import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Request, Response } from 'express';
import { UpdateSurveyDTO } from './DTO/update-survey.dto';
import { AuthGuard } from '@nestjs/passport';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('survey')
export class SurveyController {
  constructor(
    private surveyService: SurveyService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async welcome() {
    return 'survey';
  }

  @UseGuards(MyJwtGuard)
  @Get('getSurveyById/:id')
  async getSurveyById(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const { id: userId } = req.user;
      const survey = await this.surveyService.getSurveyById(id, userId);
      res.status(HttpStatus.OK).json({
        message: 'Get current survey successfully',
        data: survey,
      });
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Post('createSurvey')
  async createSurvey(@Res() res: Response, @Req() req) {
    try {
      const newSurvey = await this.surveyService.createSurvey(req.user.id);
      res.status(HttpStatus.CREATED).json({
        message: 'Create survey successfully',
        data: newSurvey,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Patch('changeSurvey')
  async changeSurvey(@Res() res: Response, @Body() body: UpdateSurveyDTO) {
    try {
      const response = await this.surveyService.changeSurvey(body);
      res.status(HttpStatus.OK).json({
        message: 'Update survey successfully',
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
  @Get('getSurveysOfCurrentUser')
  async getSurveysOfCurrentUser(
    @Req() req,
    @Res() res: Response,
    @Query() query,
  ) {
    try {
      const userId = req.user.id;
      const data = await this.surveyService.getSurveysOfCurrentUser(
        userId,
        query,
      );
      res.status(HttpStatus.OK).json({
        message: 'Get current survey successfully',
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Get('getSharedUserSurvey/:id')
  async getSharedUserSurvey(
    @Req() req,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const { id: userId } = req.user;
      const survey = await this.surveyService.getSharedUserSurvey(id, userId);
      res.status(HttpStatus.OK).json({
        message: 'Get shared user survey successfully',
        data: survey,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Patch(':surveyId/changeBackgroundSurvey')
  @UseInterceptors(FileInterceptor('file'))
  async changeBackgroundSurvey(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Body() body,
    @Req() req,
    @Param('surveyId') surveyId: string,
  ) {
    try {
      const { currentBackgroundUrl } = body;
      const { id: userId } = req.user;
      await this.surveyService.checkOwner(userId, surveyId);
      if (currentBackgroundUrl)
        await this.cloudinaryService.destroyFile(currentBackgroundUrl);
      const response = await this.cloudinaryService.uploadFile(file);
      const newUrl: string = response.secure_url;
      await this.surveyService.changeBackgroundSurvey(surveyId, {
        backgroundImage: newUrl,
      });
      res.status(HttpStatus.OK).json({
        message: 'Change background image successfully',
        data: newUrl,
      });
      return response;
    } catch (error) {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
}
