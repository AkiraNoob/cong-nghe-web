import { NextFunction, Request, Response } from 'express';
import { EUserRole } from '../constant/enum/user.enum';
import AppError from '../constant/error';
import { EHttpStatus } from '../constant/statusCode';
import { TUserMiddlewareParse } from '../types/api/auth.types';
import { TCourseSchema } from '../types/schema/course.schema.types';

export const userRolePermissionMiddleware =
  (roleAccess: EUserRole[] = [EUserRole.Admin, EUserRole.Student]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const err = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Not have user in req.');
      res.status(err.statusCode).json({ data: null, message: err.message });
      return;
    }

    if (roleAccess.includes((req.user as TUserMiddlewareParse).role)) {
      next();
      return;
    }

    const err = new AppError(EHttpStatus.FORBIDDEN, 'You do not have access to this resource.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  };

export const adminRolePermissionMiddleware =
  (roleAccess: EUserRole[] = [EUserRole.Admin, EUserRole.Student]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const err = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Not have user in req.');
      res.status(err.statusCode).json({ data: null, message: err.message });
      return;
    }
    const userRole = (req.user as TUserMiddlewareParse).role;
    if (roleAccess.includes(userRole) && userRole == EUserRole.Admin) {
      console.log(req.user, ' is Admin');
      next();
      return;
    }

    const err = new AppError(EHttpStatus.FORBIDDEN, 'You do not have access to this resource.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  };
export const userJoinedCoursePermissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const _req = req as Request & { course: TCourseSchema };

  const course = _req.course;

  if (!course) {
    const err = new AppError(EHttpStatus.INTERNAL_SERVER_ERROR, 'Not have course in req.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  }

  if (!course.participantsId.some((item) => item.userId === (req.user as TUserMiddlewareParse).id)) {
    const err = new AppError(EHttpStatus.FORBIDDEN, 'You have not joined this course.');
    res.status(err.statusCode).json({ data: null, message: err.message });
    return;
  }

  next();
};
