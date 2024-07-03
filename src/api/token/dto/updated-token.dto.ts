import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDto } from './create-token.dto';
import { IsOptional, IsString } from 'class-validator';
import { ActionedBaseDto } from '@/common/dto';

export class UpdatedTokenDto {
  accessToken?: string;
  refreshToken?: string;
  resetPasswordToken?: string;
  verifyEmailToken?: string;
}
