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
  UseGuards,
} from '@nestjs/common';
import { SurveyShareService } from './survey-share.service';
import { Response } from 'express';
import { ShareEmailDTO } from './DTO/share-email.dto';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';

@Controller('survey-share')
export class SurveyShareController {
  constructor(private readonly surveyShareService: SurveyShareService) {}

  @UseGuards(MyJwtGuard)
  @Post('shareWithEmail')
  async shareWithEmail(
    @Res() res: Response,
    @Body() body: ShareEmailDTO,
    @Req() req,
  ) {
    try {
      const { id: userId } = req.user;
      const response = await this.surveyShareService.shareWithEmail(
        body,
        userId,
      );
      res.status(HttpStatus.OK).json({
        message: 'Share successfully',
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
  @Get('getSharedSurveysOfCurrentUser')
  async getSharedSurveysOfCurrentUser(
    @Req() req,
    @Res() res: Response,
    @Query() query,
  ) {
    try {
      const userId = req.user.id;
      const data = await this.surveyShareService.getSharedSurveysOfCurrentUser(
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
  @Patch(':id/changeEditSharedUser')
  async changeEditSharedUser(
    @Res() res: Response,
    @Body() body: { isEdit: boolean; surveyId: string },
    @Req() req,
    @Param('id') sharedId: string,
  ) {
    try {
      const { id: userId } = req.user;
      const response = await this.surveyShareService.changeEditSharedUser(
        sharedId,
        userId,
        body,
      );
      res.status(HttpStatus.OK).json({
        message: 'Edit shared user successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  @UseGuards(MyJwtGuard)
  @Delete('survey/:surveyId/deleteSharedSurvey/:sharedId')
  async deleteSharedSurvey(
    @Res() res: Response,
    @Req() req,
    @Param('surveyId') surveyId: string,
    @Param('sharedId') sharedId: string,
  ) {
    try {
      const { id: userId } = req.user;
      const response = await this.surveyShareService.deleteSharedSurvey(
        sharedId,
        userId,
        surveyId,
      );
      res.status(HttpStatus.OK).json({
        message: 'Delete shared user successfully',
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
}
