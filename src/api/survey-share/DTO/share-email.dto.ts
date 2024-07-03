import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import QuestionType from 'src/utils/interface/questionType';

export class ShareEmailDTO {
  @IsNotEmpty()
  surveyId: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  isEdit: boolean;

  @IsOptional()
  title: string;

  @IsOptional()
  message: string;

  @IsNotEmpty()
  linkEditSurvey: string;
}
