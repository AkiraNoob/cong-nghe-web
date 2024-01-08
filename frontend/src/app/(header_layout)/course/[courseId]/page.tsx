import dynamic from 'next/dynamic';
import { CourseInformationComponentSkeleton } from '~/components/comment/course_information_component';
import CourseCommentSection from './comment';

const CourseInformationComponent = dynamic(() => import('~/components/comment/course_information_component'), {
  loading: CourseInformationComponentSkeleton,
});

const detailCoursePage = ({ params }: { params: { courseId: string } }) => {
  return (
    <>
      <CourseInformationComponent courseId={params.courseId} />

      {/* <div className="m-8 p-4">
        <h2 className="text-2xl font-bold">Khoá học đề xuất</h2>
        <div className="flex overflow-auto gap-10 mt-8 py-2">
          {data.map((item, index) => (
            <div key={index}>
              <CourseComponent id={item.id} name={item.name} date={item.date} image={item.image} views={item.views} />
            </div>
          ))}
        </div>
      </div> */}

      <CourseCommentSection />
    </>
  );
};
export default detailCoursePage;
