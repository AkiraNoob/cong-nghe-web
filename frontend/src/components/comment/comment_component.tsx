import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';
import React from 'react';
import CommentInteraction, { CommentMenu } from './comment_interaction';

export interface ICommentComponentProps {
  numberOfLikes: number;
  numberOfDislikes: number;
  numberOfReplies: number;
  isCurrentUserLike: boolean;
  isCurrentUserDislike: boolean;
  content: string;
  userId: string;
  isReply: boolean;
  fullName: string;
  rating?: number;
  avatar: string;
  createdAt: string;
}

const CommentComponent: React.FC<ICommentComponentProps> = ({
  avatar,
  fullName,
  userId,
  rating,
  content,
  createdAt,
  isReply,
  ...rest
}) => {
  return (
    <div className="flex items-start space-x-4 mb-10">
      {/* Avatar, Đánh giá, Ngày bình luận */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-4 flex-1">
            <Avatar src={avatar} alt={fullName} />
            <span className="font-bold">{fullName}</span>
            {!!rating && <Rating name="comment-rating" value={rating} precision={0.5} readOnly />}
            <span className="text-gray-500">{format(createdAt, 'dd/MM/yyyy')}</span>
          </div>
          <CommentMenu userId={userId} />
        </div>
        {/* Nội dung bình luận */}
        <p className="my-3 ">{content}</p>
        {/* Các icon Thích, Bình luận */}
        <CommentInteraction {...rest} />
      </div>
    </div>
  );
};

export default CommentComponent;
