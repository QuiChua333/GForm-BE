import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserGoogleAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsBoolean()
  @IsNotEmpty()
  isVerifiedEmail: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isGoogleAccount: boolean;
}
