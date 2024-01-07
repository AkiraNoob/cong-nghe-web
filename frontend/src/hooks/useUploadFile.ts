import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postUploadImage } from '~/api/file.api';
import { TError } from '~/types/generic.types';

export const useUploadImage = (config?: Partial<UseMutationOptions<string, TError, Blob, unknown>>) => {
  const mutationReturn = useMutation({
    mutationFn: postUploadImage,
    onError(_err, _key, _config) {
      return toast('Có lỗi khi tải file.');
    },
    ...config,
  });

  return mutationReturn;
};
