import type { UserRole } from '@/common/enums';

export interface IValidateUserParams {
  email: string;
  role: UserRole;
  password: string;
}

export interface IValidateJwtUserParams {
  email: string;
}

export interface ITokenPayload {
  email: string;
  id?: string;
}
