import HttpException from './HttpException';

export default class InternalErrorException extends HttpException {
  constructor(message?: string) {
    super(500, message || 'Internal error');
    this.name = 'InternalServerError';
  }
}
