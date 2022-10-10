import { NextFunction, Request, Response } from 'express';
import UnauthorizedException from '../exceptions/UnauthorizedException';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const [type, token] = authorization?.split(' ') || ['', ''];

  if (type !== 'Bearer')
    return next(new UnauthorizedException('Badly formatted token'));
  if (token !== process.env.API_TOKEN)
    return next(new UnauthorizedException('Invalid token'));

  next();
};
