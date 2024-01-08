import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { putUpdateLikeAndDislike } from '~/api/comment.api';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TUpdateLikeAndDislike } from '~/types/api/comment.types';
import { TError } from '~/types/generic.types';

const useUpdateLikeDislike = (
  commentId: string,
  config?: Partial<UseMutationOptions<null, TError, Omit<TUpdateLikeAndDislike, 'commentId'>, unknown>>,
) => {
  const mutationReturn = useMutation({
    mutationFn: (data: Omit<TUpdateLikeAndDislike, 'commentId'>) => putUpdateLikeAndDislike({ ...data, commentId }),
    onError(_err, _key, _config) {
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        return msg.map((item) => toast(item, { type: 'error' }));
      }

      return toast(msg, { type: 'error' });
    },
    ...config,
  });

  return mutationReturn;
};

export default useUpdateLikeDislike;
