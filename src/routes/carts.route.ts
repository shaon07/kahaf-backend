import { Router } from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCart,
  updateCart,
  userCarts,
} from "../controllers/cart.controller";

const router = Router();

router.route("/").get(getAllCarts).post(createCart);
router.route("/:id").get(getCart).patch(updateCart).delete(deleteCart);
router.route("/user/:id").get(userCarts);

export default router;
