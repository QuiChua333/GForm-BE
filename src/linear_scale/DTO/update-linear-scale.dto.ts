import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLinearScaleDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  min: number;

  @IsOptional()
  max: number;

  @IsOptional()
  status: string;

  @IsOptional()
  leftLabel: string;

  @IsOptional()
  rightLabel: string;
}
