import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { UserSchemaDTO } from './dto';

const Validater = {
  validateUser: async function (req: Request, res: Response, next: NextFunction) {
    try {
      await UserSchemaDTO.validate(req.body);
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        next(err.message);
        return;
      }
      next(err);
    }
  },
};

export default Validater;
