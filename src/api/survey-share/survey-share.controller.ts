import { Body, Param, Query } from '@nestjs/common';
import { SurveyShareService } from './survey-share.service';
import { Response } from 'express';
import { ShareEmailDTO } from './DTO/share-email.dto';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import surveyShareRoutes from './survey-share.routes';

@InjectController({ name: surveyShareRoutes.index })
export class SurveyShareController {
  constructor(private readonly surveyShareService: SurveyShareService) {}

  @InjectRoute(surveyShareRoutes.shareWithEmail)
  async shareWithEmail(@Body() body: ShareEmailDTO, @ReqUser() reqUser) {
    const { id: userId } = reqUser;
    const response = await this.surveyShareService.shareWithEmail(body, userId);
    return response;
  }

  @InjectRoute(surveyShareRoutes.getSharedSurveysOfCurrentUser)
  async getSharedSurveysOfCurrentUser(@ReqUser() reqUser, @Query() query) {
    const userId = reqUser.id;
    const data = await this.surveyShareService.getSharedSurveysOfCurrentUser(
      userId,
      query,
    );
    return data;
  }

  @InjectRoute(surveyShareRoutes.changeEditSharedUser)
  async changeEditSharedUser(
    @Body() body: { isEdit: boolean; surveyId: string },
    @ReqUser() reqUser,
    @Param('id') sharedId: string,
  ) {
    const { id: userId } = reqUser;
    const response = await this.surveyShareService.changeEditSharedUser(
      sharedId,
      userId,
      body,
    );

    return response;
  }

  @InjectRoute(surveyShareRoutes.deleteSharedSurvey)
  async deleteSharedSurvey(
    @ReqUser() reqUser,
    @Param('surveyId') surveyId: string,
    @Param('sharedId') sharedId: string,
  ) {
    const { id: userId } = reqUser;
    const response = await this.surveyShareService.deleteSharedSurvey(
      sharedId,
      userId,
      surveyId,
    );
    return response;
  }
}
