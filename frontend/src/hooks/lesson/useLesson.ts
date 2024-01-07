import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getLessonById } from '~/api/lesson.api';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { TGetLessonByIdResponse } from '~/types/api/lesson.types';
import { TError } from '~/types/generic.types';

const useLesson = (
  lessonId: string,
  config?: Partial<UseQueryOptions<TGetLessonByIdResponse, TError, TGetLessonByIdResponse, QueryKey>>,
) => {
  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.LESSON, lessonId],
    queryFn: () => getLessonById(lessonId),
  });
  return queryReturn;
};

export default useLesson;
