import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
