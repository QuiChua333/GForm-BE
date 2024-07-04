import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'row',
  changeRow: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  addRow: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  deleteRow: <IRouteParams>{
    jwtSecure: false,
    path: '/:id',
    code: HttpStatus.OK,
    method: RequestMethod.DELETE,
  },
};
