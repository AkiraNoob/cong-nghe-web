import { Error } from 'mongoose';
import { EHttpStatus } from '../../common/statusCode';
import AppError from '../../constant/error';
import DemoModel from '../../modules/demo';
import { TServiceResponseType } from '../../types/general.types';
import { TDemoSchemaType } from '../../types/schema/demo.schema.types';
import { log, warn } from 'console';
import { Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
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
  login: async (req: Request) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return {
          data: ['No filed username or password'],
          statusCode: EHttpStatus.BAD_REQUEST,
        };
      }
      const foundUser = await getUserByUserName(username);
      if (!foundUser) {
        return {
          data: ['Invalid username'],
          statusCode: EHttpStatus.UNAUTHORIZED,
        };
      }
      const compare = (password: string, user_password: string) => {
        return password == user_password;
      };

      const match = compare(password, foundUser.password);
      if (match) {
        // Create Access Token
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const accessToken = jwt.sign(
          { username: foundUser.username, role: foundUser.role },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: '10s' },
        );
        // res.cookie('accessToken', accessToken, {
        //   maxAge: 300000, // 5 minutes
        //   httpOnly: true,
        // });
        return {
          data: [accessToken, 'Login success'],
          statusCode: EHttpStatus.OK,
        };
      } else {
        return {
          data: ['Wrong password'],
          statusCode: EHttpStatus.UNAUTHORIZED,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        data: null,
        statusCode: EHttpStatus.BAD_REQUEST,
      };
    }
  },
  logout: async (req: Request, res: Response) => {
    res.cookie('accessToken', '', {
      maxAge: 0,
      httpOnly: true,
    });

    return {
      data: ['Log out successfull'],
      statusCode: EHttpStatus.OK,
    };
  },
};
export default userServices;
