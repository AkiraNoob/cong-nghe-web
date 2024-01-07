import { Request } from 'express';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import CourseModel from '../../models/course';
import { TCourseId, TCourseTitle, TUserAndCourseById } from '../../types/api/userCourse';
import UserModel from '../../models/user';
// import { Date } from 'mongoose';
const userCourseServices = {
  userJoinCourseById: async (req: Request) => {
    const reqBody = req.body as TUserAndCourseById;
    const userId = reqBody.userId;
    const courseId = reqBody.courseId;
    const course = await CourseModel.findById({ _id: courseId });
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }
    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }
    const existingParticipation = course.participantsId.find((participant) => participant.userId === userId);

    if (existingParticipation) {
      return {
        data: null,
        statusCode: EHttpStatus.BAD_REQUEST,
        message: 'User already joined the course', // Informative message
      };
    }
    const userParticipation = {
      userId: userId,
      participatedDate: new Date(Date.now()),
    };
    course.participantsId.push(userParticipation);
    await course.save();

    user.participatedCourses.push(courseId);
    await user.save();

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'User joined successfully',
    };
  },
  deleteUserJoinedCourseById: async (req: Request) => {
    const reqBody = req.body as TUserAndCourseById;
    const userId = reqBody.userId;
    const courseId = reqBody.courseId;
    const course = await CourseModel.findById({ _id: courseId });
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }
    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }

    const participantIndex = course.participantsId.findIndex((participant) => participant.userId === userId);

    if (participantIndex === -1) {
      return {
        data: null,
        statusCode: EHttpStatus.BAD_REQUEST,
        message: 'The user has not joined the course',
      };
    }

    course.participantsId.splice(participantIndex, 1);

    await course.save();
    const participatedCourseIndex = user.participatedCourses.findIndex(
      (participatedCourse) => participatedCourse == courseId,
    );

    if (participatedCourseIndex === -1) {
      return {
        data: null,
        statusCode: EHttpStatus.BAD_REQUEST,
        message: 'The user has not joined the course',
      };
    }

    user.participatedCourses.splice(participatedCourseIndex, 1);
    await user.save();

    return {
      data: course,
      statusCode: EHttpStatus.OK,
      message: 'User removed from course successfully',
    };
  },
  searchCourseTitle: async (req: Request) => {
    const { courseTitle } = req.query as TCourseTitle;
    console.log('courseTitle: ', courseTitle);
    const searchQuery = { $text: { $search: courseTitle } };

    const courses = await CourseModel.find(searchQuery).select('_id title');

    return {
      data: courses,
      statusCode: EHttpStatus.OK,
      message: 'Search course successfully',
    };
  },

  getCourseSuggestions: async (req: Request) => {
    const { courseId } = req.params as TCourseId;
    console.log('courseId: ', courseId);
    const course = await CourseModel.findById({ _id: courseId }).select('label');

    if (!course) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'Course not found');
    }
    const courseLabels = course.label;

    const courses = await CourseModel.find({
      label: { $in: courseLabels },
      _id: { $ne: courseId },
    }).select('_id title label');

    return {
      data: courses,
      statusCode: EHttpStatus.OK,
      message: 'get Course suggestions successfully',
    };
  },
};
export default userCourseServices;
