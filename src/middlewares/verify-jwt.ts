import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../secrets";

interface RequestWithUser extends Request {
  user: any; // You can specify the type of the 'user' property here
}

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type based on your token payload
    }
  }
}

const verifyJWT = async (req: Request, _: Response, next: NextFunction) => {
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
};

export default verifyJWT;
