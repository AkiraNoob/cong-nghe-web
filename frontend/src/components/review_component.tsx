import { ThumbDown, ThumbUp } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { format } from 'date-fns';
import React from 'react';

interface CommentComponentProps {
  avatarUrl: string;
  username: string;
  rating: number;
  date: Date;
  content: string;
  likes: number;
  dislikes: number;
  comments: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  avatarUrl,
  username,
  rating,
  date,
  content,
  likes,
  dislikes,
  comments,
}) => {
  return (
    <div className="flex items-start space-x-4 mb-10">
      {/* Avatar, Đánh giá, Ngày bình luận */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-4">
          <Avatar src={avatarUrl} alt={username} />
          <span className="font-bold">{username}</span>
          <Rating name="comment-rating" value={rating} precision={0.5} readOnly />
          <span className="text-gray-500">{format(date, 'dd/MM/yyyy')}</span>
        </div>
        {/* Nội dung bình luận */}
        <p className="my-3 ">{content}</p>
        {/* Các icon Thích, Bình luận */}
        <div className="flex items-center space-x-3 mt-2">
          <ThumbUp></ThumbUp>
          <span>{likes}</span>
          <ThumbDown></ThumbDown>
          <span>{dislikes}</span>
          <ChatBubbleOutlineIcon />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
