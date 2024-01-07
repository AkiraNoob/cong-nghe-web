import { TSelectionLessonResourse } from '~/types/api/lesson.types';
import { ESelectionAnswerChoiceList } from '../enum/lesson.enum';

export const defaultSelectionQuestionResource: TSelectionLessonResourse = {
  correctAnswer: ESelectionAnswerChoiceList.A,
  answerA: '',
  answerB: '',
  answerC: '',
  answerD: '',
  question: '',
  explanation: undefined,
};
