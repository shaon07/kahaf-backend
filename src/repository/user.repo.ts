import { prisma } from "../prisma";
import { createUserType, updateUserType } from "../types/user";

export const findMany = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
  return users;
};

export const findUnique = async (id: string) => {
  const user = await prisma.user
    .findUnique({
      where: { id },
      omit: {
        password: true,
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });
  return user;
};

export const findOne = async (data: { email: string; username: string }) => {
  const user = await prisma.user
    .findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
      omit: {
        password: true,
      },
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
      },
    })
    .catch((err) => {
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
      },
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return user;
};
