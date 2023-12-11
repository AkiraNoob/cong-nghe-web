import express from 'express';
import userController from './controller';
import isLogged from './validater';

const authRoute = express.Router();
authRoute.post('/register', userController.register);
authRoute.post('/login', userController.login);
authRoute.get('/users', isLogged, userController.getUsers);
authRoute.post('/logout', isLogged, userController.logout);
export default authRoute;
