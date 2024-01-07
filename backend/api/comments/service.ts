import { Request } from 'express';
import { generateCommentResponse } from '../../common/generateCommentResponse';
import { EHttpStatus } from '../../constant/statusCode';
import { commentExistsMiddleware, courseExistsMiddleware, lessonExistsMiddleware } from '../../middleware/exists';
import { userIsOwnerOfCommentMiddleware } from '../../middleware/permissionAccess';
import CommentsModel from '../../models/comment';
import { TUserMiddlewareParse } from '../../types/api/auth.types';
import {
  TCUCommentResponse,
  TCreateCommentPayload,
  TDeleteCommentPayload,
  TGetRepliesByCommentId,
  TUpdateCommentPayload,
} from '../../types/api/comments.types';
import { TServiceResponseType } from '../../types/general.types';

const commentsService = {
  createNewComment: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse>> => {
    const user = req.user as TUserMiddlewareParse;
    const { rootCommentId, ...commentData } = req.body as TCreateCommentPayload;

    const comment = await CommentsModel.create({ ...commentData, userId: user.id, isReply: !!rootCommentId });

    if (rootCommentId) {
      const parentComment = await commentExistsMiddleware(rootCommentId);

      parentComment.replies.push(comment._id.toString());
      await parentComment.save();
    }

    return {
      data: generateCommentResponse(comment, user),
      statusCode: EHttpStatus.OK,
      message: 'Comment successfully',
    };
  },
  updateCommentById: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse>> => {
    const user = req.user as TUserMiddlewareParse;
    const reqBody = req.body as TUpdateCommentPayload;

    const comment = await commentExistsMiddleware(reqBody.commentId);
    await userIsOwnerOfCommentMiddleware(req, comment);

    comment.content = reqBody.content;
    comment.rating = reqBody.rating;

    await comment.save();

    return {
      data: generateCommentResponse(comment, user),
      statusCode: EHttpStatus.OK,
      message: 'Update comment successfully',
    };
  },
  deleteCommentById: async (req: Request): Promise<TServiceResponseType<null>> => {
    const reqBody = req.body as TDeleteCommentPayload;

    const comment = await commentExistsMiddleware(reqBody.commentId);
    await userIsOwnerOfCommentMiddleware(req, comment);

    await comment.deleteOne();
    const concurrentPromise = comment.replies.map((eachSubCommentId) =>
      CommentsModel.findByIdAndDelete(eachSubCommentId),
    );

    await Promise.all(concurrentPromise);

    return {
      data: null,
      statusCode: EHttpStatus.OK,
      message: 'Delete comment successfully',
    };
  },
  getCommentByCourseId: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse[]>> => {
    const course = await courseExistsMiddleware(req);
    const user = req.user as TUserMiddlewareParse;

    const concurrentPromise = course.comments.map((commentId) =>
      CommentsModel.findById(commentId).then((comment) => (!comment ? null : generateCommentResponse(comment, user))),
    );

    const data: TCUCommentResponse[] = await Promise.all(concurrentPromise).then(
      (item) => item.filter((_) => _ !== null) as TCUCommentResponse[],
    );

    return {
      data,
      statusCode: EHttpStatus.OK,
      message: 'Get comments successfully',
    };
  },
  getCommentByLessonId: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse[]>> => {
    const lesson = await lessonExistsMiddleware(req);
    const user = req.user as TUserMiddlewareParse;

    const concurrentPromise = lesson.comments.map((commentId) =>
      CommentsModel.findById(commentId).then((comment) => (!comment ? null : generateCommentResponse(comment, user))),
    );

    const data: TCUCommentResponse[] = await Promise.all(concurrentPromise).then(
      (item) => item.filter((_) => _ !== null) as TCUCommentResponse[],
    );

    return {
      data,
      statusCode: EHttpStatus.OK,
      message: 'Get comments successfully',
    };
  },
  getRepliesByCommentId: async (req: Request): Promise<TServiceResponseType<TCUCommentResponse[]>> => {
    const user = req.user as TUserMiddlewareParse;
    const reqBody = req.body as TGetRepliesByCommentId;

    const comment = await commentExistsMiddleware(reqBody.commentId);

    const concurrentPromise = comment.replies.map((replyId) =>
      CommentsModel.findById(replyId).then((comment) => (!comment ? null : generateCommentResponse(comment, user))),
    );

    const data: TCUCommentResponse[] = await Promise.all(concurrentPromise).then(
      (item) => item.filter((_) => _ !== null) as TCUCommentResponse[],
    );

    return {
      data,
      statusCode: EHttpStatus.OK,
      message: 'Get replies successfully',
    };
  },
};

export default commentsService;
