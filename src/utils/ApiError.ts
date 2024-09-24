type ApiErrorType = {
  statusCode: number;
  message: string;
  success: boolean;
  stack?: any;
  errors?: any
};

export default class ApiError extends Error {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  errors: any;
  constructor({ message, statusCode, errors }: ApiErrorType) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors

    Error.captureStackTrace(this, this.constructor);
  }
}
