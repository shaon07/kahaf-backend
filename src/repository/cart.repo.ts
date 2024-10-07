import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { prisma } from "../prisma";
import { cartType, updateCartType } from "../types/cart";

export const findMany = async (page = DEFAULT_PAGE, take = DEFAULT_LIMIT) => {
  try {
    const cart = await prisma.cart.paginate({
      limit: take,
      page: page,
      include: {
        products: true,
      },
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
          create: [...products],
        },
      },
    });

    return cart;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const update = async (id: string, data: updateCartType) => {
  try {
    const { products } = data;
    await Promise.all(
      products.map(async (product) => {
        return await prisma.cartItem.updateMany({
          where: {
            cartID: id,
            productID: product.productID,
          },
          data: {
            quantity: product.quantity,
          },
        });
      })
    );

    const updatedCart = await prisma.cart.findUnique({
      where: {
        id,
      },
      include: {
        products: true, // include related CartItems in the response
      },
    });

    return updatedCart;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const deleteUnique = async (id: string) => {
  try {
    const cart = await prisma.cart.delete({
      where: {
        id,
      },
    });

    return cart;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const findOne = async (
  data: { userID?: string; cartID?: string },
  page = DEFAULT_PAGE,
  take = DEFAULT_LIMIT
) => {
  try {
    const cart = await prisma.cart.paginate({
      where: {
        OR: [{ userID: data.userID }, { id: data.cartID }],
      },
      include: {
        products: true,
      },
      limit: take,
      page: page,
    });

    return cart;
  } catch (error: any) {
    throw Error(error.message);
  }
};
