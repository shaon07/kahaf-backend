import { StatusCodes } from "http-status-codes";
import {
  createProductType,
  findManyType,
  updateProductType,
} from "../types/product";
import ApiError from "../utils/ApiError";
import {
  create,
  deleteUnique,
  findMany,
  findUnique,
  update,
} from "../repository/product.repo";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { createProductSchema } from "../schema/productSchema";
import { zodErrorHandler } from "../utils/zodErrorHandler";

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
      createProductSchema.parse(data);
      const productImage = await uploadOnCloudinary(data.image);

      if (!productImage?.url) {
        throw new ApiError({
          message: "Failed to upload image to cloudinary",
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }

      data.image = productImage?.url;

      const product = await create(data);

      if (!product?.id) {
        throw Error("Product not created");
      }

      return product;
    } catch (error: any) {
      zodErrorHandler(error);
    }
  },
  updateProduct: async (id: string, data: updateProductType, category = 0) => {
    try {
      if (data?.image) {
        const image = await uploadOnCloudinary(data.image);

        if (!image?.url) {
          throw Error("Failed to upload image to cloudinary");
        }

        data.image = image?.url;
      }

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
