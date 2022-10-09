import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

export const exceptionMiddleware = async (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  return response
    .status(err instanceof HttpException ? err.status : 500)
    .json({ message: err.message || 'Erro interno na aplicação' });
};
