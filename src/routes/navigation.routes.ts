import { NextFunction, Response, Request, Router } from 'express';
import { ISessionIdentifier } from '../modules/Navegacao/Service/INavigationService';
import { navigationController } from '../modules/Navegacao';

const navigationRouter = Router();

navigationRouter.get(
  '/',
  (
    req: Request<unknown, unknown, unknown, ISessionIdentifier>,
    res: Response,
    next: NextFunction,
  ) => {
    const { session_id } = req.query;

    return session_id
      ? navigationController.handleGetSession(req, res, next)
      : navigationController.handleGetUserSessions(req, res, next);
  },
);

navigationRouter.post('/', navigationController.handlePostNavigation);

navigationRouter.delete(
  '/:session_id',
  navigationController.handleDeleteSession,
);

export { navigationRouter };
