import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { TUserSelectionLessonResultSubmit, postSelectionLessonResult } from '~/api/userLesson.api';

export const useSubmitSelectionLessonResult = () => {
  const params = useParams();
  const mutation = useMutation({
    mutationFn: postSelectionLessonResult,
  });

  return {
    ...mutation,
    mutate: (body: TUserSelectionLessonResultSubmit) =>
      mutation.mutate({
        lessonId: params.lessonId as string,
        courseId: params.courseId as string,
        submit: body,
      }),
  };
};
