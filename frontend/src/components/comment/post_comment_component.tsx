'use client';
import { Avatar, Rating, TextField } from '@mui/material';
import { useState } from 'react';

interface IPostCommentComponent {
  canRating?: boolean;
}

const PostCommentComponent = ({ canRating = false }: IPostCommentComponent) => {
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(9);

  return (
    <div className="flex mb-6 w-full items-start">
      <Avatar src="/images/avatar.jpeg" alt="User Avatar" className="mr-3" />
      <div className="w-full">
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full"
          variant="outlined"
          placeholder="Nhập bình luận..."
        />
        {canRating && (
          <Rating
            name="comment-rating"
            onChange={(_, newValue) => {
              setRating(newValue ?? 0);
            }}
            value={rating}
            precision={0.5}
          />
        )}
      </div>
    </div>
  );
};

export default PostCommentComponent;
