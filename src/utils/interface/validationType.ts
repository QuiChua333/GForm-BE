import QuestionType from './questionType';

const ValidationType = {
  Content_Length: 'length',
  Content_Text: 'text',
  Content_Numer: 'number',
  Checkbox: 'checkbox',
  Multiple_Choice: 'multiple choice',
};
// const ValidationTypeOfShortAnswer = {
//   Length: 'length',
//   Text: 'text',
//   Numer: 'number',
// };

// const ValidationTypeOfParagraphAnswer = {
//     Length: 'length',
//   };

// const ValidationTypeOfShortAnswer = {
//     Content_Length: 'length',
//     Content_Text: 'text',
//     Content_Numer: 'number',
//     Checkbox: 'checkbox',
//     Multiple_Choice: 'multiple choice',
//   };

const ConditionNameOfContentLength = {
  Maximum_Character_Count: 'maximum character count',
  Minimum_Character_Count: 'minimum character count',
};

const ConditionNameOfContentText = {
  Contains: 'contains',
  Does_Not_Contain: 'does not contain',
  Email: 'email',
};

const ConditionNameOfContentNumber = {
  Greater_Than: 'greater than',
  Greater_Than_Or_Equal_To: 'greater than or equal to',
  Less_Than: 'less than',
  Less_Than_Or_Equal_To: 'less than or equal to',
  Is_Number: 'is number',
  Between: 'between',
  Not_Between: 'not between',
};
const ConditionNameOfCheckbox = {
  Select_At_Least: 'select at least',
  Select_At_Most: 'select at most',
  Select_Exactly: 'select exactly',
};

const ConditionNameOfMultiChoice = {
  Limit_To_One_Response_Per_Column: 'limit to one response per column',
};

const getNameCondition = (validationType: string) => {
  switch (validationType) {
    case ValidationType.Content_Length:
      return ConditionNameOfContentLength;
    case ValidationType.Content_Text:
      return ConditionNameOfContentText;
    case ValidationType.Content_Numer:
      return ConditionNameOfContentNumber;
    case ValidationType.Checkbox:
      return ConditionNameOfCheckbox;
    case ValidationType.Multiple_Choice:
      return ConditionNameOfMultiChoice;
  }
};

// const getValidationType = (questionType : QuestionType) => {
//     switch(questionType) {
//         case QuestionType.ShortAnswer {}
//     }
// }

export default ValidationType;
