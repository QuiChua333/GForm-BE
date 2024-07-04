import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'question',
  changeQuestion: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  changeImageQuestion: <IRouteParams>{
    jwtSecure: true,
    path: '/:id/image',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  addQuestion: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  addFirstQuestion: <IRouteParams>{
    jwtSecure: false,
    path: '/first',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  duplicateQuestion: <IRouteParams>{
    jwtSecure: false,
    path: 'duplicate',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  deleteQuestion: <IRouteParams>{
    jwtSecure: false,
    path: '/:id',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },

  deleteImageQuestion: <IRouteParams>{
    jwtSecure: true,
    path: '/:id/image',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },
};
