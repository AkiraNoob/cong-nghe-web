import AppError from '../../constant/error';
import { EHttpStatus } from '../../constant/statusCode';
import UserModel from '../../models/user';
import { TGetUserDetailByEmail, TGetUserDetailById, TGetUserDetailByIdDataResponse } from '../../types/api/user.types';

import { TServiceResponseType } from '../../types/general.types';
import { TUserSchema } from '../../types/schema/user.schema.types';

const userService = {
  createUser: async (req: TUserSchema): Promise<TServiceResponseType<TGetUserDetailByIdDataResponse | null>> => {
    const user = await UserModel.create(req);
    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Create user successfully',
    };
  },
  getUserById: async (
    params: TGetUserDetailById,
  ): Promise<TServiceResponseType<TGetUserDetailByIdDataResponse | null>> => {
    const user = await UserModel.findById({ _id: params.userId });

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Get user successfully',
    };
  },
  getUserByEmail: async (
    req: TGetUserDetailByEmail,
  ): Promise<TServiceResponseType<TGetUserDetailByIdDataResponse | null>> => {
    const user = await UserModel.findOne({ email: req.email }); //email is unique

    if (!user) {
      throw new AppError(EHttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      data: user,
      statusCode: EHttpStatus.OK,
      message: 'Get user successfully',
    };
  },
};

export default userService;
