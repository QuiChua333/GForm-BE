import { ActionedBaseDto } from '@/common/dto';

export class RegisteredUserDTO extends ActionedBaseDto {
  email: string;
  isAdmin: boolean;
  fullName: string;
  avatar: string;
  isGoogleAccount: boolean;
  isVerifiedEmail: boolean;
}
