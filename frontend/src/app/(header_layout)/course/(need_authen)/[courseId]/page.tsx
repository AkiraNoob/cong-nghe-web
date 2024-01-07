import dynamic from 'next/dynamic';
import CommentComponent from '~/components/comment/comment_component';
import { CourseInformationComponentSkeleton } from '~/components/comment/course_information_component';
import PostCommentComponent from '~/components/comment/post_comment_component';

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

      <div className="flex flex-col mx-32">
        <h2 className="text-2xl font-bold my-8">Đánh giá</h2>
        <PostCommentComponent canRating />

        <div className="my-4 w-full">
          {new Array(20).fill(0).map((_, index) => (
            <CommentComponent
              key={index}
              numberOfLikes={100}
              numberOfDislikes={35}
              numberOfReplies={50}
              isCurrentUserLike={true}
              isCurrentUserDislike={false}
              rating={1}
              content={
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos facere, corporis sequi ut quis sit debitis aperiam cupiditate. At veniam deleniti corrupti sed laudantium libero accusantium quo nobis quibusdam laboriosam!'
              }
              userId={'7433'}
              isReply={true}
              fullName={'Nguyen Duc Phuong'}
              avatar={'/images/avatar.jpeg'}
              createdAt={new Date().toISOString()}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default detailCoursePage;
