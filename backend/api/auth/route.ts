import express from 'express';
import authenticateMiddleware from '../../middleware/auth';
import authController from './controller';
import authValidator from './validator';

const authRoute = express.Router();

authRoute.post('/register', authValidator.validateRegister, authController.register);
authRoute.post('/login', authValidator.validateLocalLogin, authController.loginWithEmailAndPassword);
authRoute.post('/logout', authenticateMiddleware, authController.logout);

export default authRoute;
