import expressAsyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse";
import { StatusCodes } from "http-status-codes";
import { productService } from "../services";
import ApiError from "../utils/ApiError";

export const getProducts = expressAsyncHandler(async (req, res) => {
  const category = req.query.category;

  if (Number(category) < 0 || Number(category) > 1) {
    throw new ApiError({
      message: "Invalid category params",
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }

  const productList = await productService.getProducts(Number(category));
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
