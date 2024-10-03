import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { createCategoryType, findManyType } from "../types/category";
import ApiError from "../utils/ApiError";
import { DEFAULT_CATEGORY, DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";

export const findMany = async ({
  page = DEFAULT_PAGE,
  take = DEFAULT_LIMIT,
  products = DEFAULT_CATEGORY,
}: findManyType = {}) => {
  const categories = await prisma.category.paginate({
    include: {
      products: products ? true : false,
    }
  }).withPages({
    page: page,
    limit: take,
    includePageCount: true,
  });

  return categories;
};

export const findUnique = async (id: string, products = 0) => {
  return await prisma.category.findUnique({
    where: { id },
    include: { products: products ? true : false },
  });
};

export const findByName = async (name: string) => {
  return await prisma.category.findFirst({
    where: {
      name,
    },
  });
};

export const create = async (data: createCategoryType) => {
  return await prisma.category
    .create({
      data,
    })
    .catch((err) => {
      throw new ApiError({
        message: err.meta.cause,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    });
};

export const update = async (id: string, data: createCategoryType) => {
  return await prisma.category
    .update({
      where: {
        id: id,
      },
      data: data,
    })
    .catch((err) => {
      throw new ApiError({
        message: err.meta.cause,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    });
};

export const deleteUnique = async (id: string) => {
  return prisma.category
    .delete({
      where: { id },
    })
    .catch((err) => {
      throw new ApiError({
        message: err.meta.cause,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    });
};
