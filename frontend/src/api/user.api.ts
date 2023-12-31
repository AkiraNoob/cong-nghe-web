import { EUserRole } from '~/constant/enum/user.enum';
import httpRequest from '~/service/httpRequest';
import { TUserUpdatePayload } from '~/types/api/user.types';

export type TUserResponseBasicData = {
  email: string;
  fullName: string;
  role: EUserRole;
  avatar: string;
  participatedCourses: string[];
  learningLessons: string[];
  _id: string;
};
export const getUserDetailById = (id: string) => httpRequest.get<TUserResponseBasicData>(`/user/${id}`);

export const getMe = () => httpRequest.get<TUserResponseBasicData>(`/user/me`);

export const putUpdateProfile = (data: TUserUpdatePayload) => httpRequest.put<string>(`/user`, data);
