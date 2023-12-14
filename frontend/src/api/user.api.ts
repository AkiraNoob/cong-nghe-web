import { EUserRole } from '~/constant/enum/user.enum';
import httpRequest from '~/service/httpRequest';

export type TUserResponseBasicData = {
  email: string;
  fullName: string;
  role: EUserRole;
  avatar: string;
  participatedCourses: string[];
  learningLessons: string[];
};
export const getUserDetailById = (id: string) => httpRequest.get<TUserResponseBasicData>(`/user/${id}`);

export const getMe = () => httpRequest.get<TUserResponseBasicData>(`/user/me`);
