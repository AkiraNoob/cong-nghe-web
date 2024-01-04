import express from 'express';
import { EUserRole } from '../constant/enum/user.enum';
import authenticateMiddleware from '../middleware/auth';
import { userRolePermissionMiddleware } from '../middleware/permissionAccess';
import authRoute from './auth/route';
import lessonRoute from './lesson/route';
import statisticRoute from './statistic/route';
import userRoute from './user/route';
import userLessonRoute from './userLessons/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/lesson', authenticateMiddleware, userRolePermissionMiddleware([EUserRole.Admin]), lessonRoute);
apiRoute.use('/user-lessons', authenticateMiddleware, userRolePermissionMiddleware(), userLessonRoute);
apiRoute.use('/statistic', authenticateMiddleware, userRolePermissionMiddleware(), statisticRoute);

export default apiRoute;
