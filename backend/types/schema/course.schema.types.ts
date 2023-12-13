import { Date, ObjectId } from 'mongoose';
import { ECourseStatus } from '../../constant/enum/course.enum';
import { TSchema } from './generic.schema.types';

export type TCourseSchema = TSchema<{
  title: string;
  description: string;
  cover: string;
  rating: number;
  lessonIds: ObjectId[];
  status: ECourseStatus;
  label: string[];
  participantsId: { userId: ObjectId; participatedDate: Date }[];
  comments: ObjectId[];
}>;
