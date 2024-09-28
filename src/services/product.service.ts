import { StatusCodes } from "http-status-codes";
import { createProductType, findManyType, updateProductType } from "../types/product";
import ApiError from "../utils/ApiError";
import {
  create,
  deleteUnique,
  findMany,
  findUnique,
  update,
} from "../repository/product.repo";
import { createProductSchema } from "../schema/productSchema";

const productService = {
  getProducts: async ({ category, page, take }: findManyType = {}) => {
    try {
      const products = await findMany({ category, page, take });
      return products;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  getProduct: async (id: string, category = 0) => {
    try {
      const product = await findUnique(id, category);
      if (!product?.id) {
        throw Error("Product not found");
      }

      if (Number(category) < 0 || Number(category) > 1) {
        throw Error("Invalid category");
      }

      return product;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  createProduct: async (data: createProductType) => {
    try {
      const product = await create(data);

      if (!product?.id) {
        throw Error("Product not created");
      }

      return product;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  updateProduct: async (id: string, data: updateProductType, category = 0) => {
    try {
      const existingProduct = await findUnique(id);
      if (!existingProduct?.id) {
        throw Error("Product not found");
      }
      const product = await update(id, data, category);
      if (!product?.id) {
        throw Error("Product not updated");
      }

      return product;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  deleteProduct: async (id: string) => {
    try {
      if (!id) {
        throw new ApiError({
          message: "Id is required",
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      const existingProduct = await findUnique(id);
      if (!existingProduct?.id) {
        throw Error("Product not found");
      }

      const product = await deleteUnique(id);

      if (!product?.id) {
        throw Error("Product not deleted");
      }

      return product;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
};

export default productService;
