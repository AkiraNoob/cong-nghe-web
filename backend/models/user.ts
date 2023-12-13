import mongoose from 'mongoose';
import { EUserRole } from '../constant/enum/user.enum';
import { EMAIL_REGEX } from '../constant/regex';
import { TUserSchema } from '../types/schema/user.schema.types';

const { Schema } = mongoose;

const lessonSchema = new Schema<TUserSchema>({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [EMAIL_REGEX, 'Email format is invalid'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: EUserRole,
    default: EUserRole.Student,
  },
  avatar: {
    type: String,
  },
  participatedCourses: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  learningLessons: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const UserModel = mongoose.model<TUserSchema>('Users', lessonSchema, 'Users');

export default UserModel;
