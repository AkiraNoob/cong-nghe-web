import { ObjectSchema, object, string } from 'yup';
import validateWrapper, { objectValidateOverride } from '../../common/validator';
import { TCourseTitle, TUserAndCourseById } from '../../types/api/userCourse';

const postUserAndCourseByIdObjectValidate: ObjectSchema<TUserAndCourseById> = object({
  userId: string().required(),
  courseId: string().required(),
});
const getSearchCourseTitle: ObjectSchema<TCourseTitle> = object({
  courseTitle: string().required(),
});
const userCourseValidator = {
  validateSearchCourseTitle: validateWrapper((req) =>
    objectValidateOverride(getSearchCourseTitle, req.query as TCourseTitle),
  ),
  validateUserAndCourseById: validateWrapper((req) =>
    objectValidateOverride(postUserAndCourseByIdObjectValidate, req.body as TUserAndCourseById),
  ),
};

export default userCourseValidator;
