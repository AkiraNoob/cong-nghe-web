import express from 'express';
import userController from './controller';
import userValidator from './validator';

const userRoute = express.Router();

userRoute.get('/email', userValidator.validateGetUserDetailByEmail, userController.getUserByEmail);
userRoute.get('/me', userController.getMe);
userRoute.get('/:userId', userValidator.validateGetUserDetailById, userController.getUserById);

export default userRoute;
