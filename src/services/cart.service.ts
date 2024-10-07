import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import {
  create,
  deleteUnique,
  findMany,
  findOne,
  findUnique,
  update,
} from "../repository/cart.repo";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { cartType, updateCartType } from "../types/cart";
import { cartSchema, updateCartSchema } from "../schema/cartSchema";
import { zodErrorHandler } from "../utils/zodErrorHandler";

const cartService = {
  getAllCarts: async (
    page: number = DEFAULT_PAGE,
    take: number = DEFAULT_LIMIT
  ) => {
    try {
      const carts = await findMany(page, take);
      return carts;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  getCart: async (id: string) => {
    const cart = await findUnique(id);

    if (!cart?.id) {
      throw new ApiError({
        message: "Cart not found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    return cart;
  },
  createCart: async (data: cartType) => {
    try {
      cartSchema.parse(data);
      const cart = await create(data);
      return cart;
    } catch (error: any) {
      zodErrorHandler(error);
    }
  },
  updateCart: async (id: string, data: updateCartType) => {
    try {
      const existingCart = await findUnique(id);
      if (!existingCart?.id) {
        throw Error("Cart not found");
      }

      updateCartSchema.parse(data);
      const cart = await update(id, data);

      if (!cart?.id) {
        throw Error("Cart not updated");
      }

      return cart;
    } catch (error: any) {
      zodErrorHandler(error);
    }
  },
  deleteCart: async (id: string) => {
    try {
      const existingCart = await findUnique(id);
      if (!existingCart?.id) {
        throw Error("Cart not found");
      }

      const cart = await deleteUnique(id);

      if (!cart?.id) {
        throw Error("Cart not deleted");
      }

      return cart;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
  userCart: async (id: string, page = DEFAULT_PAGE, take = DEFAULT_LIMIT) => {
    try {
      const cart = await findOne({ userID: id }, page, take);

      return cart;
    } catch (error: any) {
      throw new ApiError({
        message: error.message,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  },
};

export default cartService;
