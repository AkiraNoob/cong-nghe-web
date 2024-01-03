import { ObjectSchema, array, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { ECourseStatus } from '../../constant/enum/course.enum';
import { TCourseById, TCoursePayload, TUpdateCourse } from '../../types/api/course.types';

const postCourseObjectValidate: ObjectSchema<TCoursePayload> = object({
  title: string().required(),
  description: string().required(),
  cover: string().required(),
  lessonIds: array().of(string().required()).default([]),
  status: string().oneOf([ECourseStatus.Hidden, ECourseStatus.Publish]).required(),
  label: array().of(string().required()).default([]),
  comments: array().of(string().required()).default([]),
});

const updateCourseObjectValidate = object({
  title: string(),
  description: string(),
  cover: string(),
  lessonIds: array().of(string()).default([]),
  status: string().oneOf([ECourseStatus.Hidden, ECourseStatus.Publish]),
  label: array().of(string()).default([]),
  comments: array().of(string()).default([]),
}) as ObjectSchema<TUpdateCourse>;
const CourseByIdObjectValidate: ObjectSchema<TCourseById> = object({
  courseId: string().required().trim(),
})
  .noUnknown(true)
  .strict();
const courseValidator = {
  validateCousre: validateWrapper((req) =>
    objectValidateOverride(postCourseObjectValidate, req.body as TCoursePayload),
  ),
  validateCourseById: validateWrapper((req) =>
    objectValidateOverride(CourseByIdObjectValidate, req.params as TCourseById),
  ),

  validateUpdateCourseById: validateWrapper((req) =>
    objectValidateOverride(updateCourseObjectValidate, req.body as TUpdateCourse),
  ),
};

export default courseValidator;
