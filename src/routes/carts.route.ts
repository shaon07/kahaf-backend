import { Router } from "express";
import { createCart, getAllCarts, getCart } from "../controllers/cart.controller";

const router = Router();

router.route("/").get(getAllCarts).post(createCart)
router.route("/:id").get(getCart);

export default router;
