import { ObjectId } from 'mongoose';
import { ELessonType, ESelectionAnswerChoiceList } from '../../constant/enum/lesson.enum';
import { TSchema } from './generic.schema.types';

export type TLessonSchema = TSchema<{
  title: string;
  description: string;
  type: ELessonType;
  /**total seconds if type === Video, else number (number of questions) */
  duration: number;
  resource: TVideoLessonResourse | TSelectionLessonResourse[] | TCodescriptLessonResourse[];
  comments: ObjectId[];
}>;

export type TVideoLessonResourse = {
  file: string;
  duration: string;
};

export type TSelectionLessonResourse = {
  question: string;
  explanation?: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: ESelectionAnswerChoiceList;
};

export type TCodescriptLessonResourse = {
  input: string;
  expected: string;
};
