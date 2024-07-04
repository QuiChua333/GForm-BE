import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'response',
  createResponse: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  getResponseSurveyById: <IRouteParams>{
    jwtSecure: true,
    path: '/survey/:id',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  getDataToExportExcel: <IRouteParams>{
    jwtSecure: true,
    path: '/data-export/:id',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },
};
