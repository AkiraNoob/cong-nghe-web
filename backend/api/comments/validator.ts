import { ObjectSchema, mixed, number, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import {
  EUpdateLikeAndDislikeAction,
  TCreateCommentPayload,
  TDeleteCommentPayload,
  TGetCommentByCourseId,
  TGetCommentByLessonId,
  TGetRepliesByCommentId,
  TUpdateCommentPayload,
  TUpdateLikeAndDislike,
} from '../../types/api/comments.types';

const createCommentObjectValidate: ObjectSchema<TCreateCommentPayload> = object({
  rating: number(),
  content: string().required(),
  rootCommentId: string(),
  courseId: string(),
  lessonId: string(),
});

const updateCommentObjectValidate: ObjectSchema<TUpdateCommentPayload> = object({
  rating: number(),
  content: string().required(),
  commentId: string().required(),
});

const deleteCommentObjectValidate: ObjectSchema<TDeleteCommentPayload> = object({
  commentId: string().required(),
});

const getCommentByCourseIdObjectValidate: ObjectSchema<TGetCommentByCourseId> = object({
  courseId: string().required(),
});

const getCommentByLessonIdObjectValidate: ObjectSchema<TGetCommentByLessonId> = object({
  lessonId: string().required(),
});

const getRepliesByCommentIdObjectValidate: ObjectSchema<TGetRepliesByCommentId> = object({
  commentId: string().required(),
});

const putUpdateLikeAndDislikeObjectValidate: ObjectSchema<TUpdateLikeAndDislike> = object({
  action: mixed<EUpdateLikeAndDislikeAction>().oneOf(Object.values(EUpdateLikeAndDislikeAction)).required(),
  commentId: string().required(),
});

const commentValidator = {
  validateCreateComment: validateWrapper((req) =>
    objectValidateOverride(createCommentObjectValidate, req.body as TCreateCommentPayload),
  ),
  validateUpdateComment: validateWrapper((req) =>
    objectValidateOverride(updateCommentObjectValidate, req.body as TUpdateCommentPayload),
  ),
  validateDeleteComment: validateWrapper((req) =>
    objectValidateOverride(deleteCommentObjectValidate, req.params as TDeleteCommentPayload),
  ),
  validateGetCommentByCourseId: validateWrapper((req) =>
    objectValidateOverride(getCommentByCourseIdObjectValidate, req.params as TGetCommentByCourseId),
  ),
  validateGetCommentByLessonId: validateWrapper((req) =>
    objectValidateOverride(getCommentByLessonIdObjectValidate, req.params as TGetCommentByLessonId),
  ),
  validateGetRepliesByCommentId: validateWrapper((req) =>
    objectValidateOverride(getRepliesByCommentIdObjectValidate, req.params as TGetRepliesByCommentId),
  ),
  validatePutUpdateLikeAndDislike: validateWrapper((req) =>
    objectValidateOverride(putUpdateLikeAndDislikeObjectValidate, req.body as TUpdateLikeAndDislike),
  ),
};

export default commentValidator;
