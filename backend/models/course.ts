import mongoose from 'mongoose';
import { ECourseStatus } from '../constant/enum/course.enum';
import { TCourseSchema } from '../types/schema/course.schema.types';

const { Schema } = mongoose;

const courseSchema = new Schema<TCourseSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 256,
    required: true,
  },
  cover: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  lessonIds: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(ECourseStatus),
  },
  label: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  participantsId: {
    type: [{ userId: Schema.Types.ObjectId, participatedDate: Date }],
    required: true,
    default: [],
  },
});

const CourseModel = mongoose.model<TCourseSchema>('Courses', courseSchema, 'Courses');

export default CourseModel;
