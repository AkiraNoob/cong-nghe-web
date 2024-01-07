import { TCommentsDocument } from '../document.types';

export type TCreateCommentPayload = {
  rating?: number;
  content: string;
  rootCommentId?: string;
};

export type TUpdateCommentPayload = {
  commentId: string;
  content: string;
  rating?: number;
};

export type TDeleteCommentPayload = {
  commentId: string;
};

export type TGetCommentByCourseId = {
  courseId: string;
};

export type TGetCommentByLessonId = {
  lessonId: string;
};

export type TGetRepliesByCommentId = {
  commentId: string;
};

/** CU means Create - Update */
export type TCUCommentResponse = Pick<TCommentsDocument, 'content' | 'userId' | 'rating' | 'isReply'> & {
  numberOfLikes: number;
  numberOfDislikes: number;
  numberOfReplies: number;
  isCurrentUserLike: boolean;
  isCurrentUserDislike: boolean;
};
