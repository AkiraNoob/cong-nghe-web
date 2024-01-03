import { Request } from 'express';
import { EUserLessonStatus } from '../../constant/enum/lesson.enum';
import { EHttpStatus } from '../../constant/statusCode';
import { courseExistsMiddleware } from '../../middleware/exists';
import CourseModel from '../../models/course';
import LessonModel from '../../models/lesson';
import UserModel from '../../models/user';
import UserLessonModel from '../../models/userLessons';
import {
  TGetAllCourseStatisticResponse,
  TGetAllLessonOfCourseStatisticResponse,
  TGetAllMembersOfCourseStatisticResponse,
} from '../../types/api/statistic.types';
import { TServiceResponseType } from '../../types/general.types';

const statisticService = {
  getAllCourse: async (): Promise<TServiceResponseType<TGetAllCourseStatisticResponse[]>> => {
    const allCourse = await CourseModel.find(
      {},
      {
        _id: true,
        cover: true,
        title: true,
        rating: true,
        lessonIds: true,
        createdAt: true,
        participantsId: true,
      },
      { timestamps: true },
    );

    return {
      data: allCourse,
      statusCode: EHttpStatus.OK,
      message: 'Get all courses statistic successfully',
    };
  },
  getAllMemberssOfCourse: async (
    req: Request,
  ): Promise<TServiceResponseType<TGetAllMembersOfCourseStatisticResponse[]>> => {
    const course = await courseExistsMiddleware(req);

    const participants = course.participantsId;

    const concurrentPromise = participants.map((item) =>
      UserModel.findById(item.userId)
        .then(
          (user) =>
            ({
              fullName: user?.fullName,
              avatar: user?.avatar || null,
              _id: user?._id,
              participatedDate: item.participatedDate,
            }) as TGetAllMembersOfCourseStatisticResponse,
        )
        .catch(() => null),
    );

    const response = (await Promise.all(concurrentPromise).then((item) =>
      item.filter((item) => item != null),
    )) as TGetAllMembersOfCourseStatisticResponse[];

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get all members statistic of course successfully',
    };
  },
  getAllLessonsssOfCourse: async (
    req: Request,
  ): Promise<TServiceResponseType<TGetAllLessonOfCourseStatisticResponse[]>> => {
    const course = await courseExistsMiddleware(req);
    const lessons = course.lessonIds;

    const concurrentPromise = lessons.map(async (item) => {
      return Promise.all([
        LessonModel.findById(item).then((item) => ({
          title: item?.title,
          createdAt: item?.createdAt,
          duration: item?.duration,
          type: item?.type,
        })),
        UserLessonModel.countDocuments({ lessonId: item, status: EUserLessonStatus.Done }),
      ]).then((item) => ({
        ...item[0],
        completedTimes: item[1],
      }));
    });

    const response = (await Promise.all(concurrentPromise).then((item) =>
      item.filter((item) => item != null),
    )) as TGetAllLessonOfCourseStatisticResponse[];

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get all lessons statistic of course successfully',
    };
  },
  getMemberOfCourse: async (req: Request): Promise<TServiceResponseType<TGetAllLessonOfCourseStatisticResponse[]>> => {
    const course = await courseExistsMiddleware(req);
    const lessons = course.lessonIds;

    const concurrentPromise = lessons.map(async (item) => {
      return Promise.all([
        LessonModel.findById(item).then((item) => ({
          title: item?.title,
          createdAt: item?.createdAt,
          duration: item?.duration,
          type: item?.type,
        })),
        UserLessonModel.countDocuments({ lessonId: item, status: EUserLessonStatus.Done }),
      ]).then((item) => ({
        ...item[0],
        completedTimes: item[1],
      }));
    });

    const response = (await Promise.all(concurrentPromise).then((item) =>
      item.filter((item) => item != null),
    )) as TGetAllLessonOfCourseStatisticResponse[];

    return {
      data: response,
      statusCode: EHttpStatus.OK,
      message: 'Get all members statistic of course successfully',
    };
  },
};

export default statisticService;
