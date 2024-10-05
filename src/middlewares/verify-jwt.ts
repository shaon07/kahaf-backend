import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../secrets";
import ApiError from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type based on your token payload
    }
  }
}

const verifyJWT = async (req: Request, _: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies.accessToken ||
      req.body.accessToken;

    if (!token) {
      throw Error("Unauthorized user");
    }
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET!);
    req.user = user;

    next();
  } catch (error: any) {
    next(
      new ApiError({
        statusCode: 401,
        message: error.message,
        success: "fail",
      })
    );
  }
};

export default verifyJWT;
