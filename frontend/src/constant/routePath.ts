const routePath = {
  LOGIN: '/login',
  REGISTER: '/register',
  COURSE_DETAIL: '/course/[courseId]',
  LESSON_DETAIL: '/course/[courseId]/lesson/[lessonId]',
  COURSE_MANAGE_DETAIL: '/course/manage/[courseId]',
  COURSE_STATISTIC: '/course/statistic',
  COURSE_STATISTIC_COURSE_DETAIL: '/course/statistic/[courseId]',
  COURSE_STATISTIC_COURSE_DETAIL_MEMBER: '/course/statistic/[courseId]/[userId]',
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
  EDIT: '/edit',
};

export default routePath;
