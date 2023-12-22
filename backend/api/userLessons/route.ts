import express from 'express';
import { ELessonType } from '../../constant/enum/lesson.enum';
import {
  courseExistsMiddleware,
  lessonBelongsToCourseMiddleware,
  lessonExistsMiddleware,
} from '../../middleware/exists';
import lessonController from './controller';
import lessonValidator from './validator';

const userLessonRoute = express.Router();

const hashValidateAndController = {
  [ELessonType.CodeScript]: {
    validator: lessonValidator.validateSubmitCodescriptLessonResult,
    controller: lessonController.postCodescriptLessonResult,
  },
  [ELessonType.Video]: {
    validator: lessonValidator.validateSubmitVideoLessonResult,
    controller: lessonController.postVideoLessonResult,
  },
  [ELessonType.Selection]: {
    validator: lessonValidator.validateSubmitSelectionLessonResult,
    controller: lessonController.postSelectionLessonResult,
  },
};

userLessonRoute.post(
  '/result',
  lessonValidator.validateSubmitLessonResultQuery,
  (req, res, next) => hashValidateAndController[req.query.type as ELessonType].validator(req, res, next),
  lessonExistsMiddleware,
  courseExistsMiddleware,
  lessonBelongsToCourseMiddleware,
  (req, res, next) => hashValidateAndController[req.query.type as ELessonType].controller(req, res, next),
);

export default userLessonRoute;
