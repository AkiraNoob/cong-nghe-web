export type TCreateCommentPayload = {
  rating?: number;
  content: string;
  rootCommentId?: string;
  courseId?: string;
  lessonId?: string;
};

export type TUpdateCommentPayload = {
  commentId: string;
  content: string;
  rating?: number;
};

// export type TDeleteCommentPayload = {
//   commentId: string;
// };

// export type TGetCommentByCourseId = {
//   courseId: string;
// };

// export type TGetCommentByLessonId = {
//   lessonId: string;
// };

// export type TGetRepliesByCommentId = {
//   commentId: string;
// };

/** CU means Create - Update */
export type TCUCommentResponse = {
  numberOfLikes: number;
  numberOfDislikes: number;
  numberOfReplies: number;
  isCurrentUserLike: boolean;
  isCurrentUserDislike: boolean;
  userId: string;
  fullName: string;
  avatar: string;
  createdAt: string;
  content: string;
  isReply: boolean;
  rating?: number;
  _id: string;
};

export enum EUpdateLikeAndDislikeAction {
  Like = 'like',
  Dislike = 'dislike',
}

export type TUpdateLikeAndDislike = {
  action: EUpdateLikeAndDislikeAction;
  commentId: string;
};
