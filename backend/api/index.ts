import express from 'express';
import authenticateMiddleware from '../middleware/auth';
import { userRolePermissionMiddleware } from '../middleware/permissionAccess';
import authRoute from './auth/route';
import courseRoute from './course/route';
import fileRoute from './file/route';
import lessonRoute from './lesson/route';
import statisticRoute from './statistic/route';
import userRoute from './user/route';
import userLessonRoute from './userLessons/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/lesson', authenticateMiddleware, lessonRoute);
apiRoute.use('/user-lessons', authenticateMiddleware, userRolePermissionMiddleware(), userLessonRoute);
apiRoute.use('/course', courseRoute);
apiRoute.use('/statistic', authenticateMiddleware, userRolePermissionMiddleware(), statisticRoute);
apiRoute.use('/file', authenticateMiddleware, fileRoute);

export default apiRoute;
