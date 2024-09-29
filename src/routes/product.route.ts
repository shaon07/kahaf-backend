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
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.route("/").get(getProducts).post(upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(
    upload.single("image"),
    validateData(updateProductSchema),
    updateProduct
  )
  .delete(deleteProduct);

export default router;
