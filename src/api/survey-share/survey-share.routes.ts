import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'survey-share',
  shareWithEmail: <IRouteParams>{
    jwtSecure: true,
    path: 'share-with-email',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  getSharedSurveysOfCurrentUser: <IRouteParams>{
    jwtSecure: true,
    path: 'all/current-user',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  changeEditSharedUser: <IRouteParams>{
    jwtSecure: true,
    path: '/:id/role',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  deleteSharedSurvey: <IRouteParams>{
    jwtSecure: true,
    path: '/:surveyId/:sharedId',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },
};
