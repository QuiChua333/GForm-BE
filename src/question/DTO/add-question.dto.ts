import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import QuestionType from 'src/utils/interface/questionType';

export class AddQuestionDTO {
  @IsString()
  @IsNotEmpty()
  currentQuestionId: string;

  @IsString()
  @IsNotEmpty()
  position: 'before' | 'after';
}
