import express from 'express';
import userController from './controller';
// import Validater from './validater';

const authRoute = express.Router();
authRoute.post('/register', userController.register);

export default authRoute;
