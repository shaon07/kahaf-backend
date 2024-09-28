import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import {
  createProductType,
  findManyType,
  updateProductType,
} from "../types/product";
import ApiError from "../utils/ApiError";

export const create = async (data: createProductType) => {
  try {
    const product = await prisma.product
      .create({
        data: data,
      })
      .catch((err) => {
        throw new ApiError({
          message: err.meta.cause,
          statusCode: StatusCodes.BAD_REQUEST,
        });
      });

    return product;
  } catch (error: any) {
    throw new ApiError({
      message: error.message,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};

export const findMany = async ({
  category = 0,
  page = 1,
  take = 10,
}: findManyType = {}) => {
  try {
    const skip = (page - 1) * take;
    const products = await prisma.product
      .findMany({
        include: {
          category: category ? true : false,
        },
        skip: skip,
        take: take,
      })
      .catch((err) => {
        throw new ApiError({
          message: err.meta.cause,
          statusCode: StatusCodes.BAD_REQUEST,
        });
      });

    const totalProducts = await prisma.product.count();
    return {
      products,
      totalPages: Math.ceil(totalProducts / take),
      currentPage: page,
    };
  } catch (error: any) {
    throw new ApiError({
      message: error.message,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};

export const findUnique = async (id: string, category = 0) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: category ? true : false,
      },
    });
    return product;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const update = async (
  id: string,
  data: updateProductType,
  category = 0
) => {
  try {
    const product = await prisma.product
      .update({
        where: { id },
        data: data,
        include: {
          category: category ? true : false,
        },
      })
      .catch((err) => {
        throw Error(err.message);
      });

    return product;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const deleteUnique = async (id: string) => {
  try {
    const product = await prisma.product.delete({
      where: { id },
    });

    return product;
  } catch (error: any) {
    throw Error(error.message);
  }
};
