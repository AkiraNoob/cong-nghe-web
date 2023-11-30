import { Request, Response } from 'express';
import userServices from './service';

const userController = {
  register: async (req: Request, res: Response) => {
    const result = await userServices.register(req);
    res.status(result.statusCode).json(result.data);
  },
};

export default userController;
