import expressAsyncHandler from "express-async-handler";
import { prisma } from "../prisma";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";

export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();

    if (categories?.length <= 0) {
      throw new ApiError({ message: "Categories not found", statusCode: 404 });
    }

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
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new ApiError({ message: "Category not found", statusCode: 404 });
    }

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

    if (!name) {
      throw new ApiError({ message: "Name is required", statusCode: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    if (!category) {
      throw new ApiError({ message: "Category not created", statusCode: 400 });
    }

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

    if (!name) {
      throw new ApiError({ message: "Name is required", statusCode: 400 });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    if (!category?.name) {
      throw new ApiError({ message: "Category not updated", statusCode: 400 });
    }

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

    if (!id) {
      throw new ApiError({ message: "Id is required", statusCode: 400 });
    }

    const category = await prisma.category
      .delete({
        where: { id },
      })
      .catch((err) => {
        throw new ApiError({
          message: err.meta.cause,
          statusCode: 400,
        });
      });

    res.status(202).json(
      new ApiResponse({
        statusCode: 202,
        data: category,
        message: "Category deleted successfully",
      })
    );
  }
);
