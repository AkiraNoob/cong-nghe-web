'use client';

import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCourseById } from '~/api/course.api';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { userContext } from '~/context/UserContext';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { IGetCourseByIdResponse } from '~/types/api/course.types';
import { TError } from '~/types/generic.types';

const useCourseDetail = (
  courseId: string,
  config?: Partial<UseQueryOptions<IGetCourseByIdResponse, TError, IGetCourseByIdResponse, QueryKey>>,
) => {
  const { isLogin } = useContext(userContext);

  const queryReturn = useQuery({
    queryKey: [QUERY_KEY.COURSE_DETAIL, courseId],
    queryFn: () => getCourseById(courseId),
    enabled: isLogin && !!courseId,
    ...config,
  });

  useEffect(() => {
    if (queryReturn.error && queryReturn.isError) {
      const msg = parseErrorMessage(queryReturn.error);
      if (Array.isArray(msg)) {
        msg.map((item) => toast(item));
        return;
      }

      toast(msg);
    }
  }, [queryReturn.error, queryReturn.isError]);

  return queryReturn;
};

export default useCourseDetail;
