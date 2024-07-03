import { ActionedBaseDto } from '@/common/dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatedUserDTO extends ActionedBaseDto {
  email: string;
  isAdmin: boolean;
  fullName: string;
  avatar: string;
  isGoogleAccount: boolean;
  isVerifiedEmail: boolean;
}
