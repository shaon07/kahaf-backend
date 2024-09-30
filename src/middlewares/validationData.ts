import { Request, Response, NextFunction } from "express";
import { z } from "zod";

import { StatusCodes } from "http-status-codes";
import { zodErrorHandler } from "../utils/zodErrorHandler";

export function validateData(schema: z.ZodObject<any, any>, type = 0) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      type === 0 ? schema.parse(req.body) : schema.safeParse(req.body);
      next();
    } catch (error: any) {
      zodErrorHandler(error, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
}
