import CourseComponent from '~/components/course_component';
import HeaderComponent from '~/components/header_component';

const HomePage: React.FC = () => {
  // Data simple
  const data = [
    {
      id: '1',
      image: '/images/java.jpg',
      name: 'Lập trình C/C++',
      date: '12/12/2023',
      rating: 4.0,
      views: 4,
    },
    {
      id: '2',
      image: '/images/cplusplus.jpg',
      name: 'Lập trình Java trên ứng dụng di động',
      date: '12/12/2023',
      rating: 3.6,
      views: 4,
    },
    {
      id: '3',
      image: '/images/java.jpg',
      name: 'Lập trình C/C++',
      date: '12/12/2023',
      rating: 4.0,
      views: 4,
    },
    {
      id: '4',
      image: '/images/cplusplus.jpg',
      name: 'Lập trình Java trên ứng dụng di động',
      date: '12/12/2023',
      rating: 3.6,
      views: 4,
    },
    {
      id: '5',
      image: '/images/java.jpg',
      name: 'Lập trình C/C++',
      date: '12/12/2023',
      rating: 4.0,
      views: 4,
    },
    {
      id: '6',
      image: '/images/cplusplus.jpg',
      name: 'Lập trình Java trên ứng dụng di động',
      date: '12/12/2023',
      rating: 3.6,
      views: 4,
    },
    // Add more data items as needed
  ];

  return (
    <div>
      <div>
        <HeaderComponent></HeaderComponent>
      </div>
      <div className="p-10">
        <h3 className="text-2xl font-bold">Danh sách khóa học</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.map((item, index) => (
            <div key={index}>
              <CourseComponent
                id={item.id}
                name={item.name}
                date={item.date}
                image={item.image}
                rating={item.rating}
                views={item.views}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
