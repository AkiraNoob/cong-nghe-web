import httpRequest from '~/service/httpRequest';
import {
  TCUCommentResponse,
  TCreateCommentPayload,
  TUpdateCommentPayload,
  TUpdateLikeAndDislike,
} from '~/types/api/comment.types';

export const getCourseComment = (courseId: string) =>
  httpRequest.get<TCUCommentResponse[]>(`/comment/course/${courseId}`);
export const getLessonComment = (lessonId: string) =>
  httpRequest.get<TCUCommentResponse[]>(`/comment/lesson/${lessonId}`);
export const getRepliesOfComment = (commentId: string) =>
  httpRequest.get<TCUCommentResponse[]>(`/comment/replies/${commentId}`);

export const postCreateComment = (data: TCreateCommentPayload) =>
  httpRequest.post<TCUCommentResponse>(`/comment`, data);
export const putUpdateComment = (data: TUpdateCommentPayload) => httpRequest.put<TCUCommentResponse>(`/comment`, data);
export const deleteComment = (commentId: string) => httpRequest.delete<TCUCommentResponse>(`/comment/${commentId}`);

export const putUpdateLikeAndDislike = (data: TUpdateLikeAndDislike) => httpRequest.put(`/comment/like-dislike`, data);
