import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'linear-scale',
  changeLinearScale: <IRouteParams>{
    jwtSecure: false,
    path: '',
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },
};
