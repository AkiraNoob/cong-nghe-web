'use client';
import { Skeleton } from '@mui/material';
import CourseComponent from '~/components/course_component';
import useGetSuggestCourse from '~/hooks/course/useGetSuggestCourse';

const SuggestCourse = ({ courseId }: { courseId: string }) => {
  const { data } = useGetSuggestCourse(courseId);
  if (data) {
    return (
      <div className="m-8 p-4">
        <h2 className="text-2xl font-bold">Khoá học đề xuất</h2>
        <div className="flex overflow-auto gap-10 mt-8 py-2">
          {data.map((item, index) => (
            <div key={index}>
              <CourseComponent
                id={item._id}
                name={item.title}
                date={item.createdAt}
                image={item.cover}
                views={item.participantsId.length}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="m-8 p-4">
      <h2 className="text-2xl font-bold">Khoá học đề xuất</h2>
      <div className="flex overflow-auto gap-10 mt-8 py-2">
        {new Array(10).fill(0).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={250} width={300} className="flex-shrink-0" />
        ))}
      </div>
    </div>
  );
};

export default SuggestCourse;
