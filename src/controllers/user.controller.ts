import expressAsyncHandler from "express-async-handler";
import { userService } from "../services";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/ApiResponse";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { cookieConfig } from "../configs";

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const { page = DEFAULT_PAGE, take = DEFAULT_LIMIT } = req.query;

  const users = await userService.getAllUser(Number(page), Number(take));
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      data: users,
      message: "Users fetched successfully",
      statusCode: StatusCodes.OK,
    })
  );
});

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
  res.clearCookie("token");
  res.status(StatusCodes.OK).json(
    new ApiResponse({
      message: "User logged out successfully",
      statusCode: StatusCodes.OK,
      data: {},
    })
  );
})