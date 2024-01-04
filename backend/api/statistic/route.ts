import express from 'express';
import statisticController from './controller';
import statisticValidator from './validator';

const statisticRoute = express.Router();

statisticRoute.get(
  '/course-all-members',
  statisticValidator.validateGetDetailStatisticOfCourse,
  statisticController.getlAllMembersOfCourseStatistic,
);
statisticRoute.get(
  '/course-all-lessons',
  statisticValidator.validateGetDetailStatisticOfCourse,
  statisticController.getlAllLessonssOfCourseStatistic,
);
statisticRoute.get(
  '/detail-member',
  statisticValidator.validateGetDetailStatisticOfMemberOfCourse,
  statisticController.getlMemberOfCourseStatistic,
);
statisticRoute.get('/all-courses', statisticController.getAllCourseStatistic);

export default statisticRoute;
