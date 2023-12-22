import { Request } from 'express';
import moment from 'moment';
import { ELessonType, EUserLessonStatus } from '../../constant/enum/lesson.enum';
import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import {
  courseExistsMiddleware,
  lessonBelongsToCourseMiddleware,
  lessonExistsMiddleware,
} from '../../middleware/exists';
import UserLessonModel from '../../models/userLessons';
import { TUserMiddlewareParse } from '../../types/api/auth.types';
import {
  TSubmitLessonResult,
  TUserCodescriptLessonResultSubmit,
  TUserSelectionLessonResultSubmit,
  TUserVideoLessonResultSubmit,
} from '../../types/api/userLesson.types';
import { TCodescriptLessonResourse, TSelectionLessonResourse } from '../../types/schema/lesson.schema.types';
import { TUserSelectionLessonCheckpoint } from '../../types/schema/userLessons.schema.types';

const lessonSerivce = {
  postResultVideoLesson: async (req: Request) => {
    const reqBody = req.body as TSubmitLessonResult<TUserVideoLessonResultSubmit>;

    const lesson = await lessonExistsMiddleware(req);
    const course = await courseExistsMiddleware(req);
    await lessonBelongsToCourseMiddleware({ lesson, course });

    if (lesson.type !== ELessonType.Video) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson type is not matched.');
    }

    const previousUserLesson = await UserLessonModel.findOne({
      userId: (req.user as TUserMiddlewareParse).id,
      lessonId: reqBody.lessonId,
      courseId: reqBody.courseId,
    });

    let status = EUserLessonStatus.Done;

    const duraionInSeconds = moment.duration(lesson?.duration).asSeconds();
    const lastViewMomentInSeconds = moment
      .duration((reqBody.submit as TUserVideoLessonResultSubmit).lastViewMoment)
      .asSeconds();

    if (duraionInSeconds > lastViewMomentInSeconds) {
      status = EUserLessonStatus.Pending;
    }

    const checkpoint = {
      lastViewMoment: (reqBody.submit as TUserVideoLessonResultSubmit).lastViewMoment,
    };

    if (previousUserLesson) {
      if (previousUserLesson.status !== EUserLessonStatus.Done) {
        previousUserLesson.status = status;
      }
      previousUserLesson.checkpoint = checkpoint;
      await previousUserLesson.save();
    } else {
      await UserLessonModel.create({
        userId: (req.user as TUserMiddlewareParse).id,
        lessonId: reqBody.lessonId,
        courseId: reqBody.courseId,
        type: ELessonType.Video,
        status,
        checkpoint,
      });
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Submit lesson successfully',
    };
  },

  postResultSelectionLesson: async (req: Request) => {
    const reqBody = req.body as TSubmitLessonResult<TUserSelectionLessonResultSubmit>;

    const lesson = await lessonExistsMiddleware(req);
    const course = await courseExistsMiddleware(req);
    await lessonBelongsToCourseMiddleware({ lesson, course });

    if (lesson.type !== ELessonType.Selection) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson type is not matched.');
    }

    const previousUserLesson = await UserLessonModel.findOne({
      userId: (req.user as TUserMiddlewareParse).id,
      lessonId: reqBody.lessonId,
      courseId: reqBody.courseId,
    });

    const status = EUserLessonStatus.Done;

    const checkpoint: TUserSelectionLessonCheckpoint[] = reqBody.submit.map((item, index) => ({
      choosenAnswer: item.choosenAnswer,
      isCorrect: (lesson.resource as TSelectionLessonResourse[])[index].correctAnswer === item.choosenAnswer,
    }));

    if (previousUserLesson) {
      previousUserLesson.checkpoint = checkpoint;
      await previousUserLesson.save();
    } else {
      await UserLessonModel.create({
        userId: (req.user as TUserMiddlewareParse).id,
        lessonId: reqBody.lessonId,
        courseId: reqBody.courseId,
        type: ELessonType.Selection,
        status,
        checkpoint,
      });
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Submit lesson successfully',
    };
  },

  postResultCodescriptLesson: async (req: Request) => {
    const reqBody = req.body as TSubmitLessonResult<TUserCodescriptLessonResultSubmit>;

    const lesson = await lessonExistsMiddleware(req);
    const course = await courseExistsMiddleware(req);
    await lessonBelongsToCourseMiddleware({ lesson, course });

    if (lesson.type !== ELessonType.CodeScript) {
      throw new AppError(EHttpStatus.BAD_REQUEST, 'Lesson type is not matched.');
    }

    const previousUserLesson = await UserLessonModel.findOne({
      userId: (req.user as TUserMiddlewareParse).id,
      lessonId: reqBody.lessonId,
      courseId: reqBody.courseId,
    });

    const status = EUserLessonStatus.Done;

    const checkpoint = {
      code: (reqBody.submit as TUserCodescriptLessonResultSubmit).code,
      result: new Array((lesson.resource as TCodescriptLessonResourse[]).length).fill(false),
    };

    if (previousUserLesson) {
      previousUserLesson.checkpoint = checkpoint;
      await previousUserLesson.save();
    } else {
      await UserLessonModel.create({
        userId: (req.user as TUserMiddlewareParse).id,
        lessonId: reqBody.lessonId,
        courseId: reqBody.courseId,
        type: ELessonType.CodeScript,
        status,
        checkpoint,
      });
    }

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Submit lesson successfully',
    };
  },
};

export default lessonSerivce;