import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'survey',
  getSurveyById: <IRouteParams>{
    jwtSecure: true,
    path: '/:id',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  getPublicSurveyById: <IRouteParams>{
    jwtSecure: false,
    path: '/:id/public',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  createSurvey: <IRouteParams>{
    jwtSecure: true,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  changeSurvey: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  changeBackgroundSurvey: <IRouteParams>{
    jwtSecure: true,
    path: '/:id/background',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  getSurveysOfCurrentUser: <IRouteParams>{
    jwtSecure: true,
    path: 'all/current-user',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  getSharedUserSurvey: <IRouteParams>{
    jwtSecure: true,
    path: '/:id/shared-user',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  deleteSurvey: <IRouteParams>{
    jwtSecure: true,
    path: '/:id',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },
};
