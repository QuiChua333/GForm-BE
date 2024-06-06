import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSurveyDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  description: string;

  @IsOptional()
  title: string;

  @IsOptional()
  isAccepting: boolean;
}
