import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { create, findMany, findUnique } from "../repository/cart.repo";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { cartType } from "../types/cart";
import { cartSchema } from "../schema/cartSchema";
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
};

export default cartService;
