import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
