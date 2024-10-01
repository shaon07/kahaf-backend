import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import {
  create,
  deleteUnique,
  findMany,
  findOne,
  findUnique,
  update,
} from "../repository/user.repo";
import ApiError from "../utils/ApiError";
import { createUserType, updateUserType } from "../types/user";
import { createUserSchema } from "../schema/userSchema";
import { zodErrorHandler } from "../utils/zodErrorHandler";
import { DEFAULT_LIMIT, DEFAULT_PAGE, SALT } from "../constants";
import { uploadOnCloudinary } from "../utils/cloudinary";

const userService = {
  getAllUser: async (page: number = DEFAULT_PAGE, take: number = DEFAULT_LIMIT) => {
    try {
      const users = await findMany(page, take);
      return users;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  getUser: async (id: string) => {
    try {
      const user = await findUnique(id);

      if (!user?.id) {
        throw Error("User not found");
      }

      return user;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  createUser: async (data: createUserType) => {
    try {
      createUserSchema.parse(data);
      const existingUser = await findOne({
        email: data.email,
        username: data.username,
      });

      if (existingUser?.id) {
        throw Error("User already exists with this email or username");
      }

      if (data?.image) {
        const image = await uploadOnCloudinary(data.image);

        if (!image?.url) {
          throw Error("Failed to upload image to cloudinary");
        }

        data.image = image?.url;
      }

      data.password = bcrypt.hashSync(data.password, SALT);

      const user = await create(data);

      if (!user?.id) {
        throw Error("User not created");
      }

      return user;
    } catch (error: any) {
      zodErrorHandler(error);
    }
  },
  updateUser: async (id: string, data: updateUserType) => {
    try {
      const existingUser = await findUnique(id);

      if (!existingUser?.id) {
        throw Error("User not found");
      }

      if (data?.image) {
        const image = await uploadOnCloudinary(data.image);

        if (!image?.url) {
          throw Error("Failed to upload image to cloudinary");
        }

        data.image = image?.url;
      }

      const user = await update(id, data);

      if (!user?.id) {
        throw Error("User not updated");
      }

      return user;
    } catch (error: any) {}
  },
  deleteUser: async (id: string) => {
    try {
      const existingUser = await findUnique(id);

      if (!existingUser?.id) {
        throw Error("User not found");
      }

      const user = await deleteUnique(id);

      if (!user?.id) {
        throw Error("User not deleted");
      }

      return user;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
};

export default userService;
