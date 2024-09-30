import { ZodError } from "zod";
import ApiError from "./ApiError";
import { StatusCodes } from "http-status-codes";

export const zodErrorHandler = (
  error: Error,
  code = StatusCodes.BAD_REQUEST
) => {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue: any) => ({
      message: `${issue.path.join(".")} is ${issue.message}`,
    }));
    throw new ApiError({
      statusCode: StatusCodes.BAD_REQUEST,
      errors: errorMessages,
      message: "Invalid data",
    });
  } else {
    throw new ApiError({
      statusCode: code,
      message: error.message,
    });
  }
};
