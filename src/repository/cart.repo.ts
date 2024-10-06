import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { prisma } from "../prisma";
import { cartType } from "../types/cart";

export const findMany = async (page = DEFAULT_PAGE, take = DEFAULT_LIMIT) => {
  try {
    const cart = await prisma.cart.paginate({
      limit: take,
      page: page,
      include: {
        products: true,
      }
    });

    return cart;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const findUnique = async (id: string) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    return cart;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const create = async (data: cartType) => {
  const { userID, products } = data;
  try {
    const cart = prisma.cart.create({
      data: {
        userID,
        products: {
          create: [...products]
        },
      },
    });

    return cart;
  } catch (error: any) {
    throw Error(error.message);
  }
};
