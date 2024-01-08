import { TGetSuggestCourseResponse } from '~/hooks/course/useGetSuggestCourse';
import httpRequest from '~/service/httpRequest';
import { TSearchCourseResponse } from '~/types/api/course.types';

export const getSearchCourse = (courseTitle: string) =>
  httpRequest.post<TSearchCourseResponse[]>(`/user-courses/search-course`, {
    courseTitle,
  });

export const postJoinedCourse = (courseId: string) =>
  httpRequest.post<string>(`/user-courses/user-join-course`, { courseId });

export const getSuggestedCourse = (courseId: string) =>
  httpRequest.get<TGetSuggestCourseResponse[]>(`/user-courses/course-suggestions/${courseId}`);
