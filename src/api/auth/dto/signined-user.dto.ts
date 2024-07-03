import { ActionedBaseDto } from '@/common/dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class SignInUserInfoDTO extends ActionedBaseDto {
  email: string;
  isAdmin: boolean;
  fullName: string;
  avatar: string;
  isGoogleAccount: boolean;
  isVerifiedEmail: boolean;
}
export class SigninedDTO {
  accessToken: string;
  refreshToken: string;
  userInfo: SignInUserInfoDTO;
}
