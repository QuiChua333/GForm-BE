import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isVerifiedEmail?: boolean;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isGoogleAccount?: boolean;
}
