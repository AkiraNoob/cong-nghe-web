import { ELessonType, ESelectionAnswerChoiceList } from '~/constant/enum/lesson.enum';
import httpRequest from '~/service/httpRequest';

export type TSubmitLessonResult<T> = {
  lessonId: string;
  courseId: string;
  submit: T;
};

export type TUserVideoLessonResultSubmit = {
  lastViewMoment: string;
};
export const postVideoLessonResult = (data: TSubmitLessonResult<TUserVideoLessonResultSubmit>) =>
  httpRequest.post(`/user-lessons/result?type=${ELessonType.Video}`, data);

export type TUserSelectionLessonResultSubmit = {
  choosenAnswer: ESelectionAnswerChoiceList | null;
}[];
export const postSelectionLessonResult = (data: TSubmitLessonResult<TUserSelectionLessonResultSubmit>) =>
  httpRequest.post(`/user-lessons/result?type=${ELessonType.Selection}`, data);

export type TUserCodescriptLessonResultSubmit = {
  code: string;
};
export const postCodescriptLessonResult = (data: TSubmitLessonResult<TUserCodescriptLessonResultSubmit>) =>
  httpRequest.post(`/user-lessons/result?type=${ELessonType.CodeScript}`, data);
