import { HttpStatus, RequestMethod } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

export default {
  index: 'auth',
  signUp: {
    jwtSecure: false,
    path: '/sign-up',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
  },

  emailVerification: {
    jwtSecure: false,
    path: '/email-verification/:verifyEmailToken',
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  signIn: <IRouteParams>{
    path: '/sign-in',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  signInGoogle: <IRouteParams>{
    path: '/sign-in/google',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  passwordResetLink: <IRouteParams>{
    path: '/password-reset-link/:email',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  verifyLinkResetPassword: <IRouteParams>{
    path: '/verify-link-reset-password/:resetPasswordToken',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.GET,
  },

  resetPassword: <IRouteParams>{
    path: '/reset-password/:email',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },

  refreshToken: <IRouteParams>{
    path: '/refresh-token',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
  },

  changeUserPassword: <IRouteParams>{
    path: '/password',
    jwtSecure: true,
    code: HttpStatus.OK,
    method: RequestMethod.PUT,
  },
};
