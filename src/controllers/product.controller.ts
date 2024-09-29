import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { productService } from "../services";
import ApiError from "../utils/ApiError";
import { DEFAULT_CATEGORY, DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { createProductSchema } from "../schema/productSchema";
import { ZodError } from "zod";
import { zodErrorHandler } from "../utils/zodErrorHandler";

export const getProducts = expressAsyncHandler(async (req, res) => {
  const {
    category = DEFAULT_CATEGORY,
    page = DEFAULT_PAGE,
    take = DEFAULT_LIMIT,
  } = req.query;

  if (Number(category || 0) < 0 || Number(category || 0) > 1) {
    throw new ApiError({
      message: "Invalid category params",
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }

  const productList = await productService.getProducts({
    category: Number(category),
    page: Number(page),
    take: Number(take),
  });

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      data: productList,
      message: "Products fetched successfully",
    })
  );
});

export const getProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category } = req.query;
  const product = await productService.getProduct(id, Number(category));

  res.status(200).json(
    new ApiResponse({
      data: product,
      message: "Product fetched successfully",
    })
  );
});

export const createProduct = expressAsyncHandler(async (req, res) => {
  const payload = req.body;
  payload.image = req?.file?.path;

  const product = await productService.createProduct(payload);

  res.status(201).json(
    new ApiResponse({
      data: product,
      message: "Product created successfully",
      statusCode: StatusCodes.CREATED,
    })
  );
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = req.query.category;
  const payload = req.body;

  payload.image = req?.file?.path;

  const product = await productService.updateProduct(
    id,
    payload,
    Number(category)
  );

  res.status(200).json(
    new ApiResponse({
      data: product,
      message: "Product updated successfully",
    })
  );
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productService.deleteProduct(id);
  res.status(200).json(
    new ApiResponse({
      data: product,
      message: "Product deleted successfully",
    })
  );
});
