import { TCourseDocument, TLessonDocument, TUserDocument } from '../document.types';

export type TGetAllCourseStatisticResponse = Pick<
  TCourseDocument,
  'cover' | 'title' | 'lessonIds' | 'participantsId' | 'rating' | 'createdAt' | '_id'
>;

export type TGetAllMembersOfCourseStatisticResponse = Pick<TUserDocument, '_id' | 'fullName' | 'avatar'> & {
  participatedDate: TCourseDocument['participantsId'][0]['participatedDate'];
};

export type TGetAllLessonOfCourseStatisticResponse = Pick<
  TLessonDocument,
  'title' | 'duration' | 'createdAt' | 'type'
> & {
  completedTimes: number;
};

export type TGetDetailStatisticOfCourseRequest = {
  courseId: string;
};

export type TGetDetailStatisticMemberOfCourseRequest = {
  userId: string;
  courseId: string;
};
