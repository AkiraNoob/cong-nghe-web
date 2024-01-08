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
import useUpdateLikeDislike from '~/hooks/comment/useUpdateLikeDislike';
import { EUpdateLikeAndDislikeAction } from '~/types/api/comment.types';
import LoadingButtonProvider from '../loading_button';
import { ICommentComponentProps } from './comment_component';

const CommentInteraction = ({
  isCurrentUserDislike,
  isCurrentUserLike,
  numberOfDislikes: _numberOfDislikes,
  numberOfLikes: _numberOfLikes,
  numberOfReplies,
  _id: commentId,
}: Pick<
  ICommentComponentProps,
  'isCurrentUserDislike' | 'numberOfDislikes' | 'isCurrentUserLike' | 'numberOfLikes' | 'numberOfReplies' | '_id'
>) => {
  const [isLike, setIsLike] = useState<boolean>(isCurrentUserLike);
  const [isDislike, setIsDislike] = useState<boolean>(isCurrentUserDislike);
  const [numberOfLikes, setNumberOfLikes] = useState(_numberOfLikes);
  const [numberOfDislikes, setNumberOfDislikes] = useState(_numberOfDislikes);

  const { isLogin } = useContext(userContext);

  const { mutate, isPending } = useUpdateLikeDislike(commentId, {
    onSuccess(data, variables, context) {
      if (variables.action === EUpdateLikeAndDislikeAction.Dislike) {
        if (isLike) {
          setIsLike(false);
          setIsDislike(true);
          setNumberOfDislikes((prev) => prev + 1);
          setNumberOfLikes((prev) => prev - 1);
        } else {
          setIsDislike((prev) => !prev);
          setNumberOfDislikes((prev) => (isDislike ? prev - 1 : prev + 1));
        }
      } else {
        if (isDislike) {
          setIsDislike(false);
          setIsLike(true);
          setNumberOfDislikes((prev) => prev - 1);
          setNumberOfLikes((prev) => prev + 1);
        } else {
          setIsLike((prev) => !prev);
          setNumberOfLikes((prev) => (isLike ? prev - 1 : prev + 1));
        }
      }
    },
  });

  useEffect(() => {
    setIsLike(isCurrentUserLike);
    setIsDislike(isCurrentUserDislike);
  }, [isCurrentUserDislike, isCurrentUserLike]);

  const handleLike = () => {
    mutate({ action: EUpdateLikeAndDislikeAction.Like });
  };

  const handleDislile = () => {
    mutate({ action: EUpdateLikeAndDislikeAction.Dislike });
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex items-center gap-1">
        <LoadingButtonProvider isLoading={isPending} className="rounded-full">
          <IconButton disabled={!isLogin} onClick={handleLike}>
            {isLike ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
          </IconButton>
        </LoadingButtonProvider>
        <span>{numberOfLikes}</span>
      </div>
      <div className="flex items-center gap-1">
        <LoadingButtonProvider isLoading={isPending} className="rounded-full">
          <IconButton disabled={!isLogin} onClick={handleDislile}>
            {isDislike ? <ThumbDownAlt /> : <ThumbDownAltOutlined />}
          </IconButton>
        </LoadingButtonProvider>
        <span>{numberOfDislikes}</span>
      </div>
      <div className="flex items-center gap-1">
        <IconButton disabled={!isLogin}>
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
      {userId === data?._id && (
        <div className=" basis-5">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};
