export default class HttpException extends Error {
  public readonly status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = statusCode;
  }
}
