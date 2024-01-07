import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getAllCourseStatistic } from '~/api/statistic.api';
import { QUERY_KEY } from '~/constant/reactQueryKey';
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

  return queryReturn;
};
export default useCourseStatistic;
