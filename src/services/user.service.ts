import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import {
  create,
  deleteUnique,
  findOne,
  findUnique,
  update,
} from "../repository/user.repo";
import ApiError from "../utils/ApiError";
import { zodErrorHandler } from "../utils/zodErrorHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET_EXPIRE_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET_EXPIRE_IN,
} from "../secrets";
import { UpdateUserType, UserType } from "../types/user";
import { userSchema } from "../schema/user.schema";
import { SALT } from "../constants";

const userService = {
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
  createUser: async (data: UserType) => {
    try {
      userSchema.parse(data);
      const existingUser = await findOne({
        email: data.email,
        username: data.username,
      });

      if (existingUser?.id) {
        throw Error("User already exists with this email or username");
      }

      if (data?.picture) {
        const picture = await uploadOnCloudinary(data.picture);

        if (!picture?.url) {
          throw Error("Failed to upload image to cloudinary");
        }

        data.picture = picture?.url;
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
  updateUser: async (id: string, data: UpdateUserType) => {
    try {
      const existingUser = await findUnique(id);

      if (!existingUser?.id) {
        throw Error("User not found");
      }

      if (data?.picture) {
        const picture = await uploadOnCloudinary(data.picture);

        if (!picture?.url) {
          throw Error("Failed to upload image to cloudinary");
        }

        data.picture = picture?.url;
      }

      const user = await update(id, data);

      if (!user?.id) {
        throw Error("User not updated");
      }

      return user;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
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
  loginUser: async (email: string, password: string) => {
    try {
      const user = await findOne({ email, omit: { password: false } });

      if (!user?.id) {
        throw Error("User not found with this email");
      }

      const isPassWordMatch = bcrypt.compareSync(password, user?.password);

      if (!isPassWordMatch) {
        throw Error("Incorrect password");
      }

      const accessToken = jwt.sign(
        {
          id: user?.id,
          email: user?.email,
          username: user?.username,
        },
        ACCESS_TOKEN_SECRET!,
        {
          expiresIn: ACCESS_TOKEN_SECRET_EXPIRE_IN!,
        }
      );

      const refreshToken = jwt.sign(
        {
          id: user?.id,
        },
        REFRESH_TOKEN_SECRET!,
        {
          expiresIn: REFRESH_TOKEN_SECRET_EXPIRE_IN!,
        }
      );

      const updatedUser = await update(user?.id, { refreshToken });

      if (!updatedUser?.id) {
        throw Error("User not updated");
      }

      return { ...updatedUser, accessToken, refreshToken };
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  logoutUser: async (id: string) => {
    try {
      const user = await update(id, { refreshToken: undefined });

      if (!user?.id) {
        throw Error("User not updated");
      }

      return user;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  refreshToken: async (refreshToken: string) => {
    try {
      if (!refreshToken) {
        throw Error("Refresh token is required");
      }

      const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!);

      if (typeof user === "object" && user !== null) {
        if (!user.id) {
          throw Error("User not found");
        }

        const accessToken = jwt.sign(
          {
            id: user?.id,
            email: user?.email,
            role: user?.role,
            username: user?.username,
          },
          ACCESS_TOKEN_SECRET!,
          {
            expiresIn: ACCESS_TOKEN_SECRET_EXPIRE_IN!,
          }
        );

        const refreshToken = jwt.sign(
          {
            id: user?.id,
          },
          REFRESH_TOKEN_SECRET!,
          {
            expiresIn: REFRESH_TOKEN_SECRET_EXPIRE_IN!,
          }
        );

        const updatedUser = await update(user?.id, { refreshToken });

        return { ...updatedUser, accessToken, refreshToken };
      } else {
        throw Error("Invalid token");
      }
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
};

export default userService;
