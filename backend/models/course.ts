import mongoose from 'mongoose';
import { ECourseStatus } from '../constant/enum/course.enum';
import { TCourseDocument } from '../types/document.types';

const { Schema } = mongoose;

const courseSchema = new Schema<TCourseDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 1000,
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
    type: [String],
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
    type: [String],
    required: true,
    default: [],
  },
  participantsId: {
    type: [{ userId: String, participatedDate: Date }],
    required: true,
    default: [],
  },
});

const CourseModel = mongoose.model<TCourseDocument>('Courses', courseSchema, 'Courses');

export default CourseModel;
