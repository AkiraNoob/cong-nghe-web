'use client';

import { Skeleton } from '@mui/material';
import CodeScriptLesson from '~/components/lesson/code_script_lesson';
import SelectionQuiz from '~/components/lesson/selection_quiz';
import VideoQuestion from '~/components/lesson/video_lesson';
import { ELessonType } from '~/constant/enum/lesson.enum';
import useLesson from '~/hooks/lesson/useLesson';
import { TSelectionLessonResourse } from '~/types/api/lesson.types';

const LessonContent = ({ lessonId }: { lessonId: string }) => {
  const { data, isSuccess } = useLesson(lessonId);

  if (data && isSuccess) {
    return (
      <>
        {data.type === ELessonType.Video && <VideoQuestion />}

        <div className="p-[20px_10px] lg:p-[40px_90px] max-w-[1440px] w-full mx-auto space-y-[20px] text-textMain">
          <h1 className="text-[48px] font-semibold">{data.title}</h1>
          <p className="text-[#684949] text-[18px] font-normal leading-[140%]">{data.description}</p>
        </div>
        {data.type === ELessonType.Selection && (
          <SelectionQuiz mode="take" questtionList={data.resource as TSelectionLessonResourse[]} />
        )}

        {data.type === ELessonType.CodeScript && <CodeScriptLesson />}
      </>
    );
  }

  return (
    <>
      <LessonContentSkeleton />
    </>
  );
};

export default LessonContent;

export function LessonContentSkeleton() {
  return (
    <div className="p-[20px_10px] lg:p-[40px_90px] max-w-[1440px] w-full mx-auto space-y-[20px] text-textMain">
      <Skeleton variant="rounded" width={'100%'} height={'24px'} />
      <Skeleton variant="rounded" width={'100%'} height={'100px'} />
    </div>
  );
}
