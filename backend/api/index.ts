import express from 'express';
import authenticateMiddleware from '../middleware/auth';
import { userRolePermissionMiddleware } from '../middleware/permissionAccess';
import authRoute from './auth/route';
import userRoute from './user/route';
import userLessonRoute from './userLessons/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/user', authenticateMiddleware, userRoute);
apiRoute.use('/user-lessons', authenticateMiddleware, userRolePermissionMiddleware(), userLessonRoute);

export default apiRoute;
