import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'gcolumn',
  changeGColumn: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  addGColumn: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  deleteGColumn: <IRouteParams>{
    jwtSecure: false,
    path: '/:id',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },
};
