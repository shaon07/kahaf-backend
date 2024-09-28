import expressAsyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import { categoryService } from "../services";
import { DEFAULT_CATEGORY, DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants";

export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { page = DEFAULT_PAGE, take = DEFAULT_LIMIT, products=DEFAULT_CATEGORY } = req.query;
    const categories = await categoryService.getCategories({
      page: Number(page),
      take: Number(take),
      products: Number(products),
    });

    res.status(200).json(
      new ApiResponse({
        data: categories,
        message: "Categories fetched successfully",
      })
    );
  }
);

export const getCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { products = DEFAULT_CATEGORY } = req.query;  
    const category = await categoryService.getCategory(id, Number(products));

    res.status(200).json(
      new ApiResponse({
        data: category,
        message: "Category fetched successfully",
      })
    );
  }
);

export const createCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await categoryService.createCategory({ name });

    res.status(200).json(
      new ApiResponse({
        data: category,
        message: "Category created successfully",
      })
    );
  }
);

export const updateCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!id) {
      throw new ApiError({ message: "Id is required", statusCode: 400 });
    }

    const category = await categoryService.updateCategory(id, { name });

    res.status(200).json(
      new ApiResponse({
        data: category,
        message: "Category updated successfully",
      })
    );
  }
);

export const deleteCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const category = await categoryService.deleteCategory(id);

    res.status(202).json(
      new ApiResponse({
        statusCode: 202,
        data: category,
        message: "Category deleted successfully",
      })
    );
  }
);
