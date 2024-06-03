import { IsOptional } from 'class-validator';
import QuestionType from 'src/utils/interface/questionType';

export class UpdateQuestionDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  question: string;

  @IsOptional()
  description: string;

  @IsOptional()
  image: string;

  @IsOptional()
  isRequired: boolean;

  @IsOptional()
  isHasDescription: boolean;

  @IsOptional()
  questionType: QuestionType;

  @IsOptional()
  isValidation: boolean;

  @IsOptional()
  isHasOther: boolean;
}
