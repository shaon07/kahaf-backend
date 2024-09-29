export type ApiErrorType = {
  statusCode: number;
  message: string;
  success?: 'fail' | 'success';
  stack?: any;
  errors?: any
};

export default class ApiError extends Error {
  statusCode: number;
  data: any;
  message: string;
  success: 'fail' | 'success';
  errors: any;
  constructor({ message, statusCode, errors }: ApiErrorType) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = 'fail';
    this.errors = errors

    Error.captureStackTrace(this, this.constructor);
  }
}
