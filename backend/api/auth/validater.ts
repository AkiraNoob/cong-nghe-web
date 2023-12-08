import express from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { EHttpStatus } from '../../common/statusCode';
const isLogged = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { accessToken } = req.cookies;
  console.log('accessToken: ' + accessToken);
  if (!accessToken) {
    return res.status(EHttpStatus.FORBIDDEN).json('Not have accessToken');
  }
  try {
    console.log('process.env.accessToken ' + process.env.ACCESS_TOKEN_SECRET);
    const decoded = <JwtPayload>jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret);
    console.log('decoded username:' + decoded.username);
    console.log('decoded role:' + decoded.role);
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.TokenExpiredError) {
      console.error('Token has expired');
      return res.status(EHttpStatus.UNAUTHORIZED).json(['Token has expired']);
    } else {
      console.error('Invalid Token');
      return res.status(EHttpStatus.FORBIDDEN).json(['Invalid token']);
    }
  }
};
export default isLogged;
