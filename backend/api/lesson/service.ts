import { Request } from 'express';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import LessonModel from '../../models/lesson';
import { TLessonResource, TLessonSchema } from '../../types/schema/lesson.schema.types';
import { TLessonById } from '../../types/api/lesson.types';

const lessonServices = {
  createLesson: async (req: Request) => {
    const reqBody = req.body as TLessonSchema<TLessonResource>;
    await LessonModel.create(reqBody);
    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Register successfully',
    };
  },
  getLessonById: async (req: Request) => {
    const lessonId = (req.params as TLessonById).lessonId;
    const lesson = await LessonModel.findById({ _id: lessonId });

    if (!lesson) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Lesson not found');
    }

    return {
      data: lesson,
      statusCode: EHttpStatus.OK,
      message: 'Get lesson successfully',
    };
  },
  deleteLessonById: async (req: Request) => {
    const lessonId = (req.params as TLessonById).lessonId;
    const lesson = await LessonModel.findByIdAndDelete({ _id: lessonId });

    if (!lesson) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Lesson not found');
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Delete lesson successfully',
    };
  },
  updateLessonById: async (req: Request) => {
    const lessonId = (req.params as TLessonById).lessonId;
    const reqBody = req.body as TLessonSchema<TLessonResource>;
    console.log('data will be update', reqBody);
    const lesson = await LessonModel.findByIdAndUpdate({ _id: lessonId }, reqBody);

    if (!lesson) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Lesson not found');
    }

    return {
      data: lesson,
      statusCode: EHttpStatus.OK,
      message: 'Update lesson successfully',
    };
  },
};
export default lessonServices;
