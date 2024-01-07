import CommentComponent from '~/components/comment/comment_component';
import PostCommentComponent from '~/components/comment/post_comment_component';
import LessonContent from './content';

export default function Page({ params }: { params: { lessonId: string } }) {
  return (
    <>
      <LessonContent lessonId={params.lessonId} />

      <div className="flex flex-col mx-32">
        <h2 className="text-2xl font-bold my-8">Bình luận</h2>
        <PostCommentComponent />

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
}
