import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import lessonSerivce from './service';

const lessonController = {
  postVideoLessonResult: tryCatchWrapper((req: Request) => lessonSerivce.postResultVideoLesson(req)),
  postSelectionLessonResult: tryCatchWrapper((req: Request) => lessonSerivce.postResultSelectionLesson(req)),
  postCodescriptLessonResult: tryCatchWrapper((req: Request) => lessonSerivce.postResultCodescriptLesson(req)),
};

export default lessonController;
