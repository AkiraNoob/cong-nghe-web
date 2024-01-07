import httpRequest from '~/service/httpRequest';
import { TCreateLessonPayload, TGetLessonByIdResponse, TLessonResource } from '~/types/api/lesson.types';

export const getLessonById = (lessonId: string) => httpRequest.get<TGetLessonByIdResponse>(`/lesson/${lessonId}`);
export const createLesson = (data: TCreateLessonPayload<TLessonResource>) =>
  httpRequest.post<string>(`/lesson/create-lesson`, data);

export const updateLesson = (lessonId: string, data: TCreateLessonPayload<TLessonResource>) =>
  httpRequest.put<string>(`/lesson/${lessonId}`, data);
