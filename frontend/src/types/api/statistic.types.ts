export type TGetAllCourseStatisticResponse = {
  title: string;
  cover: string;
  rating: number;
  lessonIds: string[];
  participantsId: { userId: string; participatedDate: string }[];
  createdAt: string;
  _id: string;
};
