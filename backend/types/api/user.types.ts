import { TUserSchema } from '../schema/user.schema.types';

export type TGetUserDetailById = {
  userId: string;
};

export type TGetUserDetailByEmail = {
  email: string;
};

export type TGetUserDetailDataResponse = Omit<TUserSchema, 'password'>;