import httpRequest from '~/service/httpRequest';
import { TGetAllCourseStatisticResponse } from '~/types/api/statistic.types';

export const getAllCourseStatistic = () => httpRequest.get<TGetAllCourseStatisticResponse[]>('/statistic/all-courses');
