import { ESelectionAnswerChoiceList } from '../../constant/enum/lesson.enum';

export type TSubmitLessonResult<T> = {
  lessonId: string;
  courseId: string;
  submit: T;
};

export type TUserVideoLessonResultSubmit = {
  lastViewMoment: string;
};

export type TUserSelectionLessonResultSubmit = {
  choosenAnswer: ESelectionAnswerChoiceList | null;
}[];

export type TUserCodescriptLessonResultSubmit = {
  code: string;
};
