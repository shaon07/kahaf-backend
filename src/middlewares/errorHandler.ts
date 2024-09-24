import { NextFunction, Request, Response, } from "express";
import ApiError from "../utils/ApiError";

export const errorHandler = ((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if(res.headersSent){
        return next(err);
    }
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    })
})