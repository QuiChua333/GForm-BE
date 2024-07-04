import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'option',
  changeOption: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  addOption: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  deleteOption: <IRouteParams>{
    jwtSecure: false,
    path: '/:id',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },
};
