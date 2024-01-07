import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useContext, useMemo } from 'react';
import { getCourseNavigate } from '~/api/course.api';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { userContext } from '~/context/UserContext';
import { TGetCourseNavigateResponse } from '~/types/api/course.types';
import { TError } from '~/types/generic.types';

const useCourseNavigateInfo = (
  courseId: string,
  lessonId: string,
  config?: Partial<UseQueryOptions<TGetCourseNavigateResponse, TError, TGetCourseNavigateResponse, QueryKey>>,
) => {
  const { isLogin } = useContext(userContext);

  const queryReturn = useQuery({
    queryFn: () => getCourseNavigate(courseId),
    queryKey: [QUERY_KEY.COURSE_NAVIGATE, courseId],
    enabled: !!courseId && isLogin,
    ...config,
  });

  const prevAndPostId = useMemo(() => {
    if (queryReturn.data) {
      const _data = queryReturn.data;

      const currentIndex = _data.lessons.findIndex((item) => item._id === lessonId);

      const prevId = currentIndex - 1;
      const postId = currentIndex + 1;

      return {
        prevId: _data.lessons[prevId]?._id,
        postId: _data.lessons[postId]?._id,
        prevable: prevId > 0,
        postable: postId < _data.lessons.length,
      };
    }
    return { prevId: null, postId: null, prevable: false, postable: false };
  }, [lessonId, queryReturn.data]);

  return { queryReturn, prevAndPostId };
};

export default useCourseNavigateInfo;
