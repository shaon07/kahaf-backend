import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { createCategoryType } from "../types/category";
import ApiError from "../utils/ApiError";

export const findMany = async () => {
  return await prisma.category.findMany();
};

export const findUnique = async (id: string) => {
  return await prisma.category.findUnique({ where: { id } });
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
