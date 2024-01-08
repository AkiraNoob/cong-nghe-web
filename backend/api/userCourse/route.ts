import express from 'express';
import userCourseValidator from './validator';
import userCourseControllers from './controller';

const userCourseRoute = express.Router();

userCourseRoute.post(
  '/user-join-course',
  (req, res, next) => userCourseValidator.validateUserAndCourseById(req, res, next),
  (req, res, next) => userCourseControllers.userJoinCourseById(req, res, next),
);
userCourseRoute.delete(
  '/user-join-course',
  (req, res, next) => userCourseValidator.validateUserAndCourseById(req, res, next),
  (req, res, next) => userCourseControllers.deleteUserJoinedCourseById(req, res, next),
);
userCourseRoute.get(
  '/search-course/',
  (req, res, next) => userCourseValidator.validateSearchCourseTitle(req, res, next),
  (req, res, next) => userCourseControllers.searchCourseTitle(req, res, next),
);
userCourseRoute.get(
  '/course-suggestions/:courseId',
  (req, res, next) => userCourseValidator.validateCourseSuggestions(req, res, next),
  (req, res, next) => userCourseControllers.getCourseSuggestions(req, res, next),
);
export default userCourseRoute;
