import { NextFunction, Request, Response } from 'express';
import INavigationService, {
  IGetSessionParams,
} from '../Service/INavigationService';
import NavigationService from '../Service/NavigationService';

export default class NavigationController {
  constructor(private service: NavigationService) {}

  async handleGetSession(
    req: Request<unknown, unknown, unknown, IGetSessionParams>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { session_id } = req.query;

      // const response = await this.service.getSession({ session_id });

      return res.status(200).json({});
    } catch (e) {
      console.log(
        `> [NAVIGATION][CONTROLLER][ERROR] An error ocurred in navigation controller`,
      );
      console.log(e);
      next(e);
    }
  }
}
