import { ObjectId } from 'mongoose';
import { TSchema } from './generic.schema.types';

export type TCommentSchema = TSchema<{
  userId: string;
  rating?: number;
  likedUsers: ObjectId[];
  unlikedUsers: ObjectId[];
  replies: ObjectId[];
}>;
