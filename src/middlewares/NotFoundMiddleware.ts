import { NextFunction, Request, Response } from 'express';
import NotFoundException from '../exceptions/NotFoundException';

export const notFoundMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  next(
    new NotFoundException(
      `Rota não encontrada ${request.path && `- rota: ${request.path}`} `,
    ),
  );
};
