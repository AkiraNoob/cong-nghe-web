import { ObjectId } from 'mongoose';
import { ELessonType, ESelectionAnswerChoiceList, EUserLessonStatus } from '../../constant/enum/lesson.enum';
import { TSchema } from './generic.schema.types';

export type TUserLessonSchema = TSchema<{
  userId: ObjectId;
  lessonId: ObjectId;
  courseId: ObjectId;
  status: EUserLessonStatus;
  type: ELessonType;
  checkpoint: TUserVideoLessonCheckpoint | TUserSelectionLessonCheckpoint[] | TUserCodescriptLessonCheckpoint;
}>;

export type TUserVideoLessonCheckpoint = {
  lastViewMoment: number;
};

export type TUserSelectionLessonCheckpoint = {
  choosenAsnwer: ESelectionAnswerChoiceList;
  isCorrect: boolean;
};

export type TUserCodescriptLessonCheckpoint = {
  code: string;
  result: boolean[];
};
