import { NextFunction, Request, Response } from 'express';
import INavigationService, {
  IDeleteSession,
  IGetAllUserSessionsParams,
  IGetSessionParams,
  Navigation,
} from '../Service/INavigationService';

export default class NavigationController {
  constructor(private service: INavigationService) {}

  handleGetSession = async (
    req: Request<unknown, unknown, unknown, IGetSessionParams>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        query: { session_id },
      } = req;

      const response = await this.service.getSession({ session_id });

      return res.status(200).json(response || {});
    } catch (e) {
      console.log(
        `> [NAVIGATION][CONTROLLER][ERROR] An error ocurred in navigation controller during session get`,
      );
      console.log(e);
      next(e);
    }
  };

  handleGetUserSessions = async (
    req: Request<unknown, unknown, unknown, IGetAllUserSessionsParams>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        query: { hash_user },
      } = req;

      const response = await this.service.getAllUserSessions({ hash_user });

      return res.status(200).json(response || []);
    } catch (e) {
      console.log(
        `> [NAVIGATION][CONTROLLER][ERROR] An error ocurred in navigation controller during user sessions get`,
      );
      console.log(e);
      next(e);
    }
  };

  handlePostNavigation = async (
    req: Request<unknown, unknown, Navigation, unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const input = req.body;

      const response = await this.service.insertNavigation(input);

      return res.status(200).json(response || {});
    } catch (e) {
      console.log(
        `> [NAVIGATION][CONTROLLER][ERROR] An error ocurred in navigation controller during insertion`,
      );
      console.log(e);
      next(e);
    }
  };

  handleDeleteSession = async (
    req: Request<IDeleteSession, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { session_id } = req.params;

      const response = await this.service.deleteNavigation({ session_id });

      return res.status(200).json(response || {});
    } catch (e) {
      console.log(
        `> [NAVIGATION][CONTROLLER][ERROR] An error ocurred in navigation controller during deletion`,
      );
      console.log(e);
      next(e);
    }
  };
}
