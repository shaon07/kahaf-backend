"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validationData_1 = require("../middlewares/validationData");
const productSchema_1 = require("../schema/productSchema");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = (0, express_1.Router)();
router.route("/").get(product_controller_1.getProducts).post(multer_middleware_1.upload.single("image"), product_controller_1.createProduct);
router
    .route("/:id")
    .get(product_controller_1.getProduct)
    .patch(multer_middleware_1.upload.single("image"), (0, validationData_1.validateData)(productSchema_1.updateProductSchema), product_controller_1.updateProduct)
    .delete(product_controller_1.deleteProduct);
exports.default = router;
