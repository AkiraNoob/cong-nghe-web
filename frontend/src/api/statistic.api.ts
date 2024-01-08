import httpRequest from '~/service/httpRequest';
import {
  TGetAllCourseStatisticResponse,
  TGetAllLessonsOfCourseStatisticResponse,
  TGetAllMembersOfCourseStatisticResponse,
  TGetMemberOfCourseStatisticResponse,
} from '~/types/api/statistic.types';

export const getAllCourseStatistic = () => httpRequest.get<TGetAllCourseStatisticResponse[]>('/statistic/all-courses');

export const getCourseDetailMembersStatistic = (courseId: string) =>
  httpRequest.get<TGetAllMembersOfCourseStatisticResponse[]>(`/statistic/course-all-members/${courseId}`);

export const getCourseDetailLessonsStatistic = (courseId: string) =>
  httpRequest.get<TGetAllLessonsOfCourseStatisticResponse[]>(`/statistic/course-all-lessons/${courseId}`);

export const getMemberDetailOfCourseStatistic = (courseId: string, userId: string) =>
  httpRequest.get<TGetMemberOfCourseStatisticResponse[]>(`/statistic/detail-member/${courseId}/${userId}`);
