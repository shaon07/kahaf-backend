import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { validateData } from "../middlewares/validationData";
import {
  createProductSchema,
  updateProductSchema,
} from "../schema/productSchema";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(validateData(createProductSchema), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(validateData(updateProductSchema), updateProduct)
  .delete(deleteProduct);

export default router;
