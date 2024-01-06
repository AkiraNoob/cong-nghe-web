import { Request } from 'express';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import CourseModel from '../../models/course';
import { TCoursePayload, TCourseById, TUpdateCourse } from '../../types/api/course.types';
import { TCourseSchema } from '../../types/schema/course.schema.types';
import { ECourseStatus } from '../../constant/enum/course.enum';

const courseServices = {
  createCourse: async (req: Request) => {
    const reqBody = req.body as TCoursePayload;
    const course = await CourseModel.create(reqBody);
    return {
      data: course._id,
      statusCode: EHttpStatus.OK,
      message: 'Create course successfully',
    };
  },
  getCourseById: async (req: Request) => {
    const courseId = (req.params as TCourseById).courseId;
    const course = await CourseModel.findById({ _id: courseId });

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'Get Course successfully',
    };
  },
  deleteCourseById: async (req: Request) => {
    const courseId = (req.params as TCourseById).courseId;
    const course = await CourseModel.findOne({ _id: courseId });

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    course.status = ECourseStatus.Hidden;
    await course.save();

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'Delete Course successfully',
    };
  },
  updateCourseById: async (req: Request) => {
    const courseId = (req.params as TCourseById).courseId;
    const reqBody = req.body as TCourseSchema;
    console.log('data will be update', reqBody);
    const course = await CourseModel.findByIdAndUpdate({ _id: courseId }, reqBody);

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'course not found');
    }

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'Update course successfully',
    };
  },
};
export default courseServices;
