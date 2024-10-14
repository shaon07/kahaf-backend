import expressAsyncHandler from "express-async-handler";
import { userService } from "../services";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/ApiResponse";
import { cookieConfig } from "../configs";
import ApiError from "../utils/ApiError";

export const getUser = expressAsyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await userService.getUser(id);
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      data: user,
      message: "User fetched successfully",
      statusCode: StatusCodes.OK,
    })
  );
});

export const createUser = expressAsyncHandler(async (req, res) => {
  const payload = req.body;
  payload.image = req?.file?.path;
  const user = await userService.createUser(payload);
  res.status(StatusCodes.CREATED).json(
    new ApiResponse({
      data: user,
      message: "User created successfully",
      statusCode: StatusCodes.CREATED,
    })
  );
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  const payload = req.body;
  payload.image = req?.file?.path;
  const user = await userService.updateUser(req.params.id, payload);
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      data: user,
      message: "User updated successfully",
      statusCode: StatusCodes.OK,
    })
  );
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await userService.deleteUser(id);
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      data: user,
      message: "User deleted successfully",
      statusCode: StatusCodes.OK,
    })
  );
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  res.cookie("accessToken", user.accessToken, cookieConfig);
  res.cookie("refreshToken", user.refreshToken, cookieConfig);
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      data: user,
      message: "User logged in successfully",
      statusCode: StatusCodes.OK,
    })
  );
});

export const logout = expressAsyncHandler(async (req, res) => {

  const id = req.user.id;
  await userService.logoutUser(id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      message: "User logged out successfully",
      statusCode: StatusCodes.OK,
      data: {},
    })
  );
});

export const refreshToken = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const token = req.cookies.refreshToken;

  if(!token && !refreshToken) {
    throw new ApiError({
      message: "Invalid refresh token",
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  }

  const user = await userService.refreshToken(token || refreshToken);
  res.cookie("accessToken", user.accessToken, cookieConfig);
  res.cookie("refreshToken", user.refreshToken, cookieConfig);
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      data: user,
      message: "User token refreshed successfully",
      statusCode: StatusCodes.OK,
    })
  );
})