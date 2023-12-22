import { NextFunction, Request, Response } from 'express';
import { catchError } from '../common/catchError';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import CourseModel from '../models/course';
import LessonModel from '../models/lesson';
import { TMockDocumentTypeWithId } from '../types/general.types';
import { TCourseSchema } from '../types/schema/course.schema.types';
import { TLessonSchema } from '../types/schema/lesson.schema.types';

export const lessonExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const lessonId = req.body.lessonId || req.query.lessonId || req.params.lessonId;
  try {
    const lesson = await LessonModel.findById(lessonId);
    if (!lesson) {
      const err = new AppError(EHttpStatus.BAD_REQUEST, 'Lesson not found.');
      res.status(err.statusCode).json({ data: null, message: err.message });
      return;
    }
    req.body = { ...req.body, lesson };
    next();
  } catch (error) {
    const err = catchError(error);
    res.status(err.statusCode).json({ data: null, message: err.message });
  }
};

export const courseExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const courseId = req.body.courseId || req.query.courseId || req.params.courseId;
  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      const err = new AppError(EHttpStatus.BAD_REQUEST, 'Course not found.');
      res.status(err.statusCode).json({ data: null, message: err.message });
      return;
    }
    req.body = { ...req.body, course };
    next();
  } catch (error) {
    const err = catchError(error);
    res.status(err.statusCode).json({ data: null, message: err.message });
  }
};

export const lessonBelongsToCourseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const _req = req.body as Request['body'] & {
    course: TMockDocumentTypeWithId<TCourseSchema>;
    lesson: TMockDocumentTypeWithId<TLessonSchema>;
  };
  const course = _req.course;
  const lesson = _req.lesson;

  if (!course) {
    const err = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Not have course in req.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  }

  if (!lesson) {
    const err = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Not have lesson in req.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  }

  if (!course.lessonIds.includes(lesson._id.toString())) {
    const err = new AppError(EHttpStatus.BAD_REQUEST, 'Lesson not belongs to course.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  }
  next();
};
