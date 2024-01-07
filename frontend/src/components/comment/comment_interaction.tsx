'use client';

import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlined from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '~/context/UserContext';
import { ICommentComponentProps } from './comment_component';

const CommentInteraction = ({
  isCurrentUserDislike,
  isCurrentUserLike,
  numberOfDislikes,
  numberOfLikes,
  numberOfReplies,
}: Pick<
  ICommentComponentProps,
  'isCurrentUserDislike' | 'numberOfDislikes' | 'isCurrentUserLike' | 'numberOfLikes' | 'numberOfReplies'
>) => {
  const [isLike, setIsLike] = useState<boolean>(isCurrentUserLike);
  const [isDislike, setIsDislike] = useState<boolean>(isCurrentUserDislike);

  useEffect(() => {
    setIsLike(isCurrentUserLike);
    setIsDislike(isCurrentUserDislike);
  }, [isCurrentUserDislike, isCurrentUserLike]);

  const handleLike = () => {
    if (isDislike) {
      setIsDislike(false);
      setIsLike(true);
    } else {
      setIsLike((prev) => prev);
    }
  };

  const handleDislile = () => {
    if (isLike) {
      setIsLike(false);
      setIsDislike(true);
    } else {
      setIsDislike((prev) => prev);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-1">
        <IconButton onClick={handleLike}>{isCurrentUserLike ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}</IconButton>
        <span>{numberOfLikes}</span>
      </div>
      <div className="flex items-center gap-1">
        <IconButton onClick={handleDislile}>
          {isCurrentUserDislike ? <ThumbDownAlt /> : <ThumbDownAltOutlined />}
        </IconButton>
        <span>{numberOfDislikes}</span>
      </div>
      <div className="flex items-center gap-1">
        <IconButton>
          <ForumOutlinedIcon />
        </IconButton>
        <span>{numberOfReplies}</span>
      </div>
    </div>
  );
};

export default CommentInteraction;

export const CommentMenu = ({ userId }: Pick<ICommentComponentProps, 'userId'>) => {
  const { data } = useContext(userContext);

  return (
    <>
      {userId === data?.id && (
        <div className=" basis-5">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};
