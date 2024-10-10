"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const validationData_1 = require("../middlewares/validationData");
const categorySchema_1 = require("../schema/categorySchema");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(category_controller_1.getCategories)
    .post((0, validationData_1.validateData)(categorySchema_1.createCategorySchema), category_controller_1.createCategory);
router
    .route("/:id")
    .get(category_controller_1.getCategory)
    .put((0, validationData_1.validateData)(categorySchema_1.createCategorySchema), category_controller_1.updateCategory)
    .delete(category_controller_1.deleteCategory);
exports.default = router;
