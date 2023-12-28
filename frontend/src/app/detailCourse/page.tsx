'use client';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import React from 'react';
import CourseComponent from '~/components/course_component';
import HeaderComponent from '~/components/header_component';
import LessonComponent from '~/components/lesson_component';
import CommentComponent from '~/components/review_component';

const detailCoursePage: React.FC = () => {
  // Data simple
  const data = [
    {
      id: '1',
      image: '/images/java.jpg',
      name: 'Lập trình java',
      date: '12/12/2023',
      rating: 4.0,
      views: 4,
    },
    {
      id: '2',
      image: '/images/java.jpg',
      name: 'Lập trình java',
      date: '12/12/2023',
      rating: 4.0,
      views: 4,
    },
  ];

  const data2 = [
    {
      id: '1',
      name: 'Bài 1: Lập trình C',
      quantity: '12:40',
      exerciseType: 'video',
      ischecked: true,
    },
    {
      id: '2',
      name: 'Bài tập: Lập trình C',
      quantity: '12 test',
      exerciseType: 'selection_quiz',
      ischecked: true,
    },
    {
      id: '3',
      name: 'Bài tập: Lập trình C',
      quantity: '12 test',
      exerciseType: 'code_quiz',
      ischecked: true,
    },
    {
      id: '4',
      name: 'Bài 2: Lập trình C',
      quantity: '12:40',
      exerciseType: 'video',
      ischecked: false,
    },
    {
      id: '5',
      name: 'Bài tập: Lập trình C',
      quantity: '12 test',
      exerciseType: 'selection_quiz',
      ischecked: false,
    },
  ];

  const total_lesson = 12;
  const total_times = '24:00';
  const total_participants = '100.000';

  return (
    <div>
      <div>
        <HeaderComponent></HeaderComponent>
      </div>
      <div className="flex flex-row m-8">
        <div className="basis-3/4 p-4">
          <h1 className="text-4xl font-bold h-12">Tiêu đề khoá học</h1>

          <label htmlFor="des-courses">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </label>

          <h2 className="text-2xl font-bold mt-10 mb-4">Nội dung khoá học</h2>
          <div className="">
            {data2.map((item, index) => (
              <div key={index}>
                <LessonComponent
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  exerciseType={item.exerciseType}
                  ischecked={item.ischecked}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="basis-1/4 p-4 flex flex-col items-center">
          <Image src={'/images/cplusplus.jpg'} alt="" className="rounded-xl" width={400} height={250}></Image>
          <button
            type="submit"
            className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 m-8"
          >
            Tham gia khoá học
          </button>
          <div className="mx-auto flex flex-col">
            <label htmlFor="">Tổng số bài học: {total_lesson}</label>
            <label htmlFor="">Tổng số thời gian: {total_times}</label>
            <label htmlFor="">Tổng số người tham gia: {total_participants}</label>
            <Rating name="comment-rating" value={5} precision={0.5} readOnly />
          </div>
        </div>
      </div>

      <div className="m-8 p-4">
        <h2 className="text-2xl font-bold">Khoá học đề xuất</h2>
        <div className="flex overflow-auto gap-10 mt-8">
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
      <div className="flex flex-col mx-32">
        <h2 className="text-2xl font-bold my-8">Đánh giá</h2>
        <div className="flex mb-6 w-full items-center">
          <Avatar src="/images/avatar.jpeg" alt="User Avatar" className="mr-3" />
          <TextField className="w-full" variant="outlined" placeholder="Type your comment..." />
        </div>
        <div className="my-4 w-full">
          <CommentComponent
            avatarUrl="/images/avatar.jpeg"
            username="hello"
            rating={4.5}
            date={new Date()}
            content="This is a great comment! This is a great comment! This is a great comment! This is a great comment!"
            likes={10}
            dislikes={10}
            comments={5}
          />
          <CommentComponent
            avatarUrl="/images/avatar.jpeg"
            username="hello"
            rating={4.5}
            date={new Date()}
            content="This is a great comment!"
            likes={10}
            dislikes={10}
            comments={5}
          />
        </div>
      </div>
    </div>
  );
};
export default detailCoursePage;
