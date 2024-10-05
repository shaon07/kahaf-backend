import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { prisma } from "../prisma";
import { createUserType, updateUserType } from "../types/user";

export const findMany = async (
  page: number = DEFAULT_PAGE,
  take: number = DEFAULT_LIMIT
) => {
  const users = await prisma.user
    .paginate({
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .withPages({
      page: page,
      limit: take,
      includePageCount: true,
    });

  return users;
};

export const findUnique = async (id: string) => {
  const user = await prisma.user
    .findUnique({
      where: { id },
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });
  return user;
};

export const findOne = async (data: {
  email: string;
  username?: string;
  omit?: { password?: boolean };
}) => {
  const omit = data?.omit ?? { password: true };
  const user = await prisma.user
    .findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
      omit: omit,
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return user;
};

export const create = async (data: createUserType) => {
  const user = await prisma.user
    .create({
      data: data,
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });
  return user;
};

export const update = async (id: string, data: updateUserType) => {
  const user = await prisma.user
    .update({
      where: { id },
      data: data,
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .catch((err) => {
      console.log(err);
      throw Error(err.message);
    });
  return user;
};

export const deleteUnique = async (id: string) => {
  const user = await prisma.user
    .delete({
      where: { id },
      omit: {
        password: true,
        refreshToken: true,
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return user;
};
