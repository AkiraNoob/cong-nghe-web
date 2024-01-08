import { getAllCourses } from '~/api/course.api';
import CourseComponent from '~/components/course_component';
import { IAllCouresResponse } from '~/types/api/course.types';

const HomePage: React.FC = async () => {
  let data: IAllCouresResponse[] = [];

  try {
    data = await getAllCourses();
  } catch (error) {
    data = [];
  }

  return (
    <div className="p-[20px_10px] lg:p-10">
      <h3 className="text-2xl font-bold">Danh sách khóa học</h3>
      <div className="mt-6 lg:mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-y-10 gap-x-5">
        {data.map((item) => (
          <CourseComponent
            key={item._id}
            id={item._id}
            name={item.title}
            date={item.createdAt}
            image={item.cover}
            views={item.totalJoined}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
