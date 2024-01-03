import { TCourseSchema } from '../schema/course.schema.types';

export type TCoursePayload = Pick<
  TCourseSchema,
  'title' | 'description' | 'cover' | 'lessonIds' | 'status' | 'label' | 'comments'
>;
export type TCourseById = {
  courseId: string;
};
export type TUpdateCourse = Partial<TCoursePayload>;
