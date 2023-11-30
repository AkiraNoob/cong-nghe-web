import { Error } from 'mongoose';
import { EHttpStatus } from '../../common/statusCode';
import AppError from '../../constant/error';
import DemoModel from '../../modules/demo';
import { TServiceResponseType } from '../../types/general.types';
import { TDemoSchemaType } from '../../types/schema/demo.schema.types';
import { warn } from 'console';
import { Request, Response } from 'express';

import { getUserByUserName, createUser } from './dto';
const userServices = {
  register: async (req: Request) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return {
          data: ['No filed username or password'],
          statusCode: EHttpStatus.BAD_REQUEST,
        };
      }
      const existingUser = await getUserByUserName(username);
      if (existingUser) {
        return {
          data: ['existing user'],
          statusCode: EHttpStatus.BAD_REQUEST,
        };
      }
      const user = await createUser({ username, password });
      return {
        data: [user],
        statusCode: EHttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        statusCode: EHttpStatus.BAD_REQUEST,
      };
    }
  },
};
export default userServices;
