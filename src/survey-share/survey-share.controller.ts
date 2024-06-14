import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
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
}
