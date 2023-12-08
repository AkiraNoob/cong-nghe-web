import { Request, Response } from 'express';
import userServices from './service';

const userController = {
  register: async (req: Request, res: Response) => {
    const result = await userServices.register(req);
    res.status(result.statusCode).json(result.data);
  },
  login: async (req: Request, res: Response) => {
    const result = await userServices.login(req);
    res.cookie('accessToken', result.data[0], {
      maxAge: 300000, // 5 minutes
      httpOnly: true,
    });
    // res.status(result.statusCode).json(result.data);
    res.status(result.statusCode).json(result.data);
  },
  getUsers: async (req: Request, res: Response) => {
    res.status(200).json("Login successfull and get users'");
  },
  logout: async (req: Request, res: Response) => {
    const result = await userServices.logout(req, res);
    res.status(result.statusCode).json(result.data);
  },
};

export default userController;
