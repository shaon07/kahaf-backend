import { Router } from "express";
import { createCart, deleteCart, getAllCarts, getCart, updateCart } from "../controllers/cart.controller";

const router = Router();

router.route("/").get(getAllCarts).post(createCart);
router.route("/:id").get(getCart).patch(updateCart).delete(deleteCart);

export default router;
