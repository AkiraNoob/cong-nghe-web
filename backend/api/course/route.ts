import express from 'express';
import courseValidator from './validator';
import courseControllers from './controller';
const courseRoute = express.Router();

courseRoute.post(
  '/create-course',
  (req, res, next) => courseValidator.validateCousre(req, res, next),
  (req, res, next) => courseControllers.createCourse(req, res, next),
);
courseRoute.get('/:courseId', courseValidator.validateCourseById, courseControllers.getCourseById);
courseRoute.delete('/:courseId', courseValidator.validateCourseById, courseControllers.deleteCourseById);

courseRoute.put(
  '/:courseId',
  (req, res, next) => courseValidator.validateUpdateCourseById(req, res, next),
  (req, res, next) => courseControllers.updateCourseById(req, res, next),
);
export default courseRoute;
