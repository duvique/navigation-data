import express from 'express';
import Http from 'http';
import cors from 'cors';
import compression from 'compression';
import { notFoundMiddleware } from './middlewares/NotFoundMiddleware';
import { exceptionMiddleware } from './middlewares/ExceptionMiddleware';
import { navigationRouter } from './routes/navigation.routes';

interface IStartReturn {
  server: Http.Server;
}

export default class App {
  private readonly server = express();

  private middlewares = async () => {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(compression());
  };

  private routes = async () => {
    this.server.use('/navigation', navigationRouter);

    this.server.use('*', notFoundMiddleware);
    this.server.use(exceptionMiddleware);
  };

  public start = async (): Promise<IStartReturn> => {
    this.middlewares();
    this.routes();

    const httpServer = Http.createServer(this.server);
    return { server: httpServer };
  };
}
