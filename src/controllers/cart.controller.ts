import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse";
import { cartService } from "../services";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";

export const getAllCarts = expressAsyncHandler(async (req, res) => {
  const { page = DEFAULT_PAGE, take = DEFAULT_LIMIT } = req.query;
  const carts = await cartService.getAllCarts(Number(page), Number(take));

  res.status(200).json(
    new ApiResponse({
      data: carts,
      message: "Carts fetched successfully",
    })
  );
});

export const getCart = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const cart = await cartService.getCart(id);

  res.status(200).json(
    new ApiResponse({
      data: cart,
      message: "Cart fetched successfully",
    })
  );
});

export const createCart = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  const cart = await cartService.createCart(data);

  res.status(201).json(
    new ApiResponse({
      data: cart,
      message: "Cart created successfully",
    })
  );
});

export const updateCart = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const cart = await cartService.updateCart(id, data);

  res.status(200).json(
    new ApiResponse({
      data: cart,
      message: "Cart updated successfully",
    })
  );
});

export const deleteCart = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const cart = await cartService.deleteCart(id);

  res.status(200).json(
    new ApiResponse({
      data: cart,
      message: "Cart deleted successfully",
    })
  );
});
