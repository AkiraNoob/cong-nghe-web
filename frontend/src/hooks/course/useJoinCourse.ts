import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { postJoinedCourse } from '~/api/userCoures.api';
import { TError } from '~/types/generic.types';

const useJoinCourse = (config?: Partial<UseMutationOptions<string, TError, string, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: postJoinedCourse,
    ...config,
  });

  return mutationReturn;
};

export default useJoinCourse;
