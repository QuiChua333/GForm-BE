export interface ITokenAuthentication {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenOptionWhere {
  user?: {
    id?: string;
  };
  accessToken?: string;
  refreshToken?: string;
  resetPasswordToken?: string;
  verifyEmailToken?: string;
}
