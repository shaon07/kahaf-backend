"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controllers/cart.controller");
const router = (0, express_1.Router)();
router.route("/").get(cart_controller_1.getAllCarts).post(cart_controller_1.createCart);
router.route("/:id").get(cart_controller_1.getCart).patch(cart_controller_1.updateCart).delete(cart_controller_1.deleteCart);
router.route("/user/:id").get(cart_controller_1.userCarts);
exports.default = router;
