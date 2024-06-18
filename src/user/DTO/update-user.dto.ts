import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  password?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  avatar?: string;
}
