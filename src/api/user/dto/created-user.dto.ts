import { ActionedBaseDto } from '@/common/dto';

export class CreatedUserDTO extends ActionedBaseDto {
  email: string;
  fullName: string;
  avatar: string;
  isAdmin: boolean;
  isGoogleAccount: boolean;
  isVerifiedEmail: boolean;
}
