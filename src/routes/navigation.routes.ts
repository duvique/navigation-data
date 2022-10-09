import { NextFunction, Response, Request, Router } from 'express';
import { navigationController } from '../modules/Navegacao';

const navigationRouter = Router();

navigationRouter.get('/', navigationController.handleGetSession);

export { navigationRouter };
