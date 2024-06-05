import { IsOptional } from 'class-validator';

export class CreateResponseDTO {
  answers: AnswerInterface[];
}

class AnswerInterface {
  questionId: string;

  @IsOptional()
  answerText?: string;

  @IsOptional()
  singleOption?: string;

  @IsOptional()
  isChooseOther?: boolean;

  @IsOptional()
  otherText?: string;

  @IsOptional()
  multiChooseOption?: string[];

  @IsOptional()
  multiChooseGrid?: { row: string; gcolumn?: string }[];

  @IsOptional()
  linearValue?: number;
}
