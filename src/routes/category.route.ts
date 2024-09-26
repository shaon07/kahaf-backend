import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { validateData } from "../middlewares/validationData";
import { createCategorySchema } from "../schema/categorySchema";

const router = Router();

router
  .route("/")
  .get(getCategories)
  .post(validateData(createCategorySchema), createCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(validateData(createCategorySchema), updateCategory)
  .delete(deleteCategory);

export default router;
