import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUserResponseBasicData, getMe } from '~/api/user.api';
import { QUERY_KEY } from '~/constant/reactQueryKey';
import { TError } from '~/types/generic.types';

const useGetMe = (
  config?: Partial<UseQueryOptions<TUserResponseBasicData, TError, TUserResponseBasicData, QueryKey>>,
) => {
  return useQuery<TUserResponseBasicData, TError, TUserResponseBasicData, QueryKey>({
    ...config,
    queryKey: [QUERY_KEY.ME],
    queryFn: getMe,
  });
};

export const useRefetchGetMe = () => {
  const queryClient = useQueryClient();
  return {
    refetch() {
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.ME], exact: true, stale: true });
    },
  };
};

export default useGetMe;
