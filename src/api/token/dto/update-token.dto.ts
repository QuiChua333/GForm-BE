import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDto } from './create-token.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTokenDto extends PartialType(CreateTokenDto) {
  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  @IsOptional()
  resetPasswordToken?: string;

  @IsString()
  @IsOptional()
  verifyEmailToken?: string;
}
