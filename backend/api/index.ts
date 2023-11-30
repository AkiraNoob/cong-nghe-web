import express from 'express';
import demoRoute from './demo/route';
import authRoute from './auth/route';
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);

export default apiRoute;
