import { ObjectId } from 'mongoose';
import { EUserRole } from '../../constant/enum/user.enum';
import { TSchema } from './generic.schema.types';

export type TUserSchema = TSchema<{
  email: string;
  password: string;
  fullName: string;
  role: EUserRole;
  avatar: string;
  participatedCourses: ObjectId[];
  learningLessons: ObjectId[];
}>;
