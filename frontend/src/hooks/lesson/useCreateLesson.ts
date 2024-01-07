import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { createLesson } from '~/api/lesson.api';
import { parseErrorMessage } from '~/helper/parseErrorMessage';
import { TCreateLessonPayload, TLessonResource } from '~/types/api/lesson.types';
import { TError } from '~/types/generic.types';

const useCreateLesson = (
  config?: Partial<
    UseMutationOptions<string, TError, Omit<TCreateLessonPayload<TLessonResource>, 'courseId'>, unknown>
  >,
) => {
  const { courseId } = useParams();

  const mutationReturn = useMutation({
    mutationFn: (data: Omit<TCreateLessonPayload<TLessonResource>, 'courseId'>) =>
      createLesson({ ...data, courseId: courseId as string }),
    onError(_err, _key, _config) {
      const msg = parseErrorMessage(_err);
      if (Array.isArray(msg)) {
        return msg.map((item) => toast(item));
      }

      return toast(msg);
    },
    ...config,
  });

  return mutationReturn;
};

export default useCreateLesson;
