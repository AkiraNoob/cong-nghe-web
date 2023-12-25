import express from 'express';
import authenticateMiddleware from '../middleware/auth';
import { adminRolePermissionMiddleware, userRolePermissionMiddleware } from '../middleware/permissionAccess';
import authRoute from './auth/route';
import userRoute from './user/route';
import userLessonRoute from './userLessons/route';
import lessonRoute from './lesson/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/lesson', authenticateMiddleware, adminRolePermissionMiddleware(), lessonRoute);
apiRoute.use('/user-lessons', authenticateMiddleware, userRolePermissionMiddleware(), userLessonRoute);

export default apiRoute;
