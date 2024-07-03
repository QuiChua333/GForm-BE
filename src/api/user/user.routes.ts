import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'user',

  getCurrentUser: <IRouteParams>{
    path: '/current-user',
    jwtSecure: true,
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  changeUserAvatar: <IRouteParams>{
    path: '/user-avatar',
    jwtSecure: true,
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  changeUserName: <IRouteParams>{
    path: '/user-name',
    jwtSecure: true,
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },
};
