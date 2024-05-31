import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Response } from 'express';
import { UpdateSurveyDTO } from './DTO/update-survey.dto';

@Controller('survey')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get()
  async welcome() {
    return 'survey';
  }

  @Get('getSurveyById/:id')
  async getSurveyById(@Res() res: Response, @Param('id') id: string) {
    try {
      const survey = await this.surveyService.getSurveyById(id);
      res.status(HttpStatus.OK).json({
        message: 'Get current survey successfully',
        data: survey,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('createSurvey')
  async createSurvey(@Res() res: Response) {
    try {
      const newSurvey = await this.surveyService.createSurvey();
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

  @Patch('changeSurvey/:id')
  async changeSurvey(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UpdateSurveyDTO,
  ) {
    try {
      const response = await this.surveyService.changeSurvey(id, body);
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
}
