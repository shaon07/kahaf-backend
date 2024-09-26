import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        throw new ApiError({ statusCode: StatusCodes.BAD_REQUEST, errors: errorMessages, message: 'Invalid data' });
      } else {
        throw new ApiError({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
      }
    }
  };
}