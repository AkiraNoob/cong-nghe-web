import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCourseStatistic } from '~/api/statistic.api';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TGetAllCourseStatisticResponse } from '~/types/api/statistic.types';
import { TError } from '~/types/generic.types';

const useCourseStatistic = (
  config?: Partial<
    UseQueryOptions<TGetAllCourseStatisticResponse[], TError, TGetAllCourseStatisticResponse[], QueryKey>
  >,
) => {
  const queryReturn = useQuery({
    queryFn: getAllCourseStatistic,
    queryKey: [QUERY_KEY.STATISTIC_COURSE],
    ...config,
  });

  useEffect(() => {
    if (queryReturn.error) {
      const _err = queryReturn.error;
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        msg.map((item) => toast(item, { type: 'error' }));
        return;
      }
      toast(msg, { type: 'error' });
    }
  }, [queryReturn.error]);

  return queryReturn;
};
export default useCourseStatistic;
