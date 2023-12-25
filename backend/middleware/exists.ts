import { Request } from 'express';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import CourseModel from '../models/course';
import LessonModel from '../models/lesson';
import { TMockDocumentTypeWithId } from '../types/general.types';
import { TCourseSchema } from '../types/schema/course.schema.types';
import { TLessonSchema, TLessonResource } from '../types/schema/lesson.schema.types';

export const lessonExistsMiddleware = async (req: Request) => {
  const lessonId = req.body.lessonId || req.query.lessonId || req.params.lessonId;
  const lesson = await LessonModel.findById(lessonId);
  if (!lesson) {
    throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson not found.');
  }
  return lesson;
};

export const courseExistsMiddleware = async (req: Request) => {
  const courseId = req.body.courseId || req.query.courseId || req.params.courseId;
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new AppError(EHttpStatus.BAD_REQUEST, 'Course not found.');
  }
  return course;
};

export const lessonBelongsToCourseMiddleware = async ({
  course,
  lesson,
}: {
  course: TMockDocumentTypeWithId<TCourseSchema>;
  lesson: TMockDocumentTypeWithId<TLessonSchema<TLessonResource>>;
}) => {
  if (!course.lessonIds.includes(lesson._id.toString())) {
    throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson not belongs to course.');
  }
};
