import {
  Body,
  Controller,
  Delete,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import surveyRoutes from './survey.routes';

@InjectController({ name: surveyRoutes.index })
export class SurveyController {
  constructor(
    private surveyService: SurveyService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @InjectRoute(surveyRoutes.getSurveyById)
  async getSurveyById(@ReqUser() reqUser, @Param('id') id: string) {
    const { id: userId } = reqUser;
    const survey = await this.surveyService.getSurveyById(id, userId);
    return survey;
  }

  @InjectRoute(surveyRoutes.getPublicSurveyById)
  async getPublicSurveyById(@Param('id') id: string) {
    const survey = await this.surveyService.getPublicSurveyById(id);
    return survey;
  }

  @InjectRoute(surveyRoutes.createSurvey)
  async createSurvey(@ReqUser() reqUser) {
    console.log(reqUser);
    const newSurvey = await this.surveyService.createSurvey(reqUser.id);
    return newSurvey;
  }

  @InjectRoute(surveyRoutes.changeSurvey)
  async changeSurvey(@Body() body: UpdateSurveyDTO) {
    const response = await this.surveyService.changeSurvey(body);
    return response;
  }

  @InjectRoute(surveyRoutes.getSurveysOfCurrentUser)
  async getSurveysOfCurrentUser(@ReqUser() ReqUser, @Query() query) {
    const userId = ReqUser.id;
    const data = await this.surveyService.getSurveysOfCurrentUser(
      userId,
      query,
    );
    return data;
  }

  @InjectRoute(surveyRoutes.getSharedUserSurvey)
  async getSharedUserSurvey(@ReqUser() reqUser, @Param('id') id: string) {
    const { id: userId } = reqUser;
    const survey = await this.surveyService.getSharedUserSurvey(id, userId);
    return survey;
  }

  @InjectRoute(surveyRoutes.changeBackgroundSurvey)
  @UseInterceptors(FileInterceptor('file'))
  async changeBackgroundSurvey(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { currentBackgroundUrl: string },
    @ReqUser() reqUser,
    @Param('id') surveyId: string,
  ) {
    const { currentBackgroundUrl } = body;
    const { id: userId } = reqUser;
    await this.surveyService.checkOwner(userId, surveyId);
    if (currentBackgroundUrl) {
      await this.cloudinaryService.destroyFile(currentBackgroundUrl);
    }

    const response = await this.cloudinaryService.uploadFile(file);
    const newUrl: string = response.secure_url;
    await this.surveyService.changeBackgroundSurvey(surveyId, {
      backgroundImage: newUrl,
    });
    return newUrl;
  }

  @InjectRoute(surveyRoutes.deleteSurvey)
  async deleteSurvey(@ReqUser() reqUser, @Param('id') id: string) {
    const userId = reqUser.id;
    await this.surveyService.deleteSurvey(userId, id);
  }
}
