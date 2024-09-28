import { StatusCodes } from "http-status-codes";
import {
  create,
  deleteUnique,
  findByName,
  findMany,
  findUnique,
  update,
} from "../repository/category.repo";
import { createCategoryType, findManyType } from "../types/category";
import ApiError from "../utils/ApiError";

const categoryService = {
  getCategories: async ({ page, take,products }: findManyType = {}) => {
    try {
      const categories = await findMany({ page, take,products });

      return categories;
    } catch (error: any) {
      throw new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message,
      });
    }
  },

  getCategory: async (id: string, products = 0) => {
    try {
      const category = await findUnique(id,products);

      if (!category) {
        throw new ApiError({
          message: "Category not found",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return category;
    } catch (error: any) {
      throw new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message,
      });
    }
  },

  createCategory: async (data: createCategoryType) => {
    try {
      const isCategoryExist = await findByName(data.name);
      if (isCategoryExist) {
        throw new ApiError({
          message: "Category already exist",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const category = await create(data);

      if (!category) {
        throw new ApiError({
          message: "Category not created",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      return category;
    } catch (error: any) {
      throw new ApiError({
        statusCode: StatusCodes.BAD_REQUEST,
        message: error.message,
      });
    }
  },

  updateCategory: async (id: string, data: createCategoryType) => {
    try {
      const category = await update(id, data);

      if (!category?.name) {
        throw new ApiError({
          message: "Category not updated",
          statusCode: 400,
        });
      }

      return category;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },

  deleteCategory: async (id: string) => {
    try {
      if (!id) {
        throw new ApiError({
          message: "Id is required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const category = await deleteUnique(id);

      if (!category) {
        throw new ApiError({
          message: "Category not deleted",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }

      return category;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
};

export default categoryService;
