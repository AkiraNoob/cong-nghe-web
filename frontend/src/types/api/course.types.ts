import { ELessonType, EUserLessonStatus } from '~/constant/enum/lesson.enum';

export interface IAllCouresResponse {
  title: string;
  description: string;
  cover: string;
  totalJoined: number;
  createdAt: string;
  _id: string;
}

export type IGetCourseByIdResponse = {
  title: string;
  description: string;
  cover: string;
  isCurrentUserJoined: boolean;
  totalJoined: number;

  lessons: Array<{
    _id: string;
    title: string;
    type: ELessonType;
    duration: number;
    status: EUserLessonStatus;
  }>;
};

export type TGetCourseNavigateResponse = {
  lessons: { title: string; type: ELessonType; _id: string }[];
};

export type TCoursePayload = {
  title: string;
  description: string;
  cover: string;
  lessonIds: string[];
  label: string[];
};
