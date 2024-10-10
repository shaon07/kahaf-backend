"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = __importDefault(require("./product.route"));
const category_route_1 = __importDefault(require("./category.route"));
const user_route_1 = __importDefault(require("./user.route"));
const carts_route_1 = __importDefault(require("./carts.route"));
const router = (0, express_1.Router)();
router.route("/").get((req, res) => {
    res.send("Hello, TypeScript with Express! from routes/index.ts");
});
router.use("/products", product_route_1.default);
router.use("/category", category_route_1.default);
router.use("/users", user_route_1.default);
router.use("/carts", carts_route_1.default);
exports.default = router;
