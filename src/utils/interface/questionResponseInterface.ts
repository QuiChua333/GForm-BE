import QuestionType from './questionType';

interface QuestionResponseInterface {
  questionId?: string;
  questionContent?: string;
  questionType?: QuestionType;
  numberOfResponses?: number;
  textResponses?: string[];
  linearResponses?: {
    value: number;
    quantity: number;
  }[];
  optionReponses?: {
    optionContent: string;
    quantity: number;
  }[];
  rowGColumnResponses?: {
    row: string;
    gcolumns: {
      gcolumnContent: string;
      quantity: number;
    }[];
  }[];
}
export default QuestionResponseInterface;
