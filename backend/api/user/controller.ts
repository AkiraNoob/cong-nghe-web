import { Request } from 'express';
import { tryCatchWrapper } from '../../common/catchError';
import { TGetUserDetailByEmail, TGetUserDetailById } from '../../types/api/user.types';
import userService from './service';

const userController = {
  getUserById: tryCatchWrapper((req: Request) => userService.getUserById(req.params as TGetUserDetailById)),
  getUserByEmail: tryCatchWrapper((req: Request) => {
    return userService.getUserByEmail(req.body as TGetUserDetailByEmail);
  }),
};

export default userController;
