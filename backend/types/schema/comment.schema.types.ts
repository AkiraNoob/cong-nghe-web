export type TCommentSchema = {
  userId: string;
  rating?: number;
  likedUsers: string[];
  unlikedUsers: string[];
  replies: string[];
};
