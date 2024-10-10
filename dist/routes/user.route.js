"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_middleware_1 = require("./../middlewares/multer.middleware");
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validationData_1 = require("../middlewares/validationData");
const userSchema_1 = require("../schema/userSchema");
const verify_jwt_1 = __importDefault(require("../middlewares/verify-jwt"));
const router = (0, express_1.Router)();
router.route("/").get(verify_jwt_1.default, user_controller_1.getAllUsers);
router.route("/detail").get(verify_jwt_1.default, user_controller_1.getUser);
router.route("/register").post(multer_middleware_1.upload.single("image"), user_controller_1.createUser);
router.route('/refresh-token').post(user_controller_1.refreshToken);
router
    .route("/login")
    .post(multer_middleware_1.upload.none(), (0, validationData_1.validateData)(userSchema_1.loginUserSchema), user_controller_1.loginUser);
router.route("/logout").get(verify_jwt_1.default, user_controller_1.logout);
router
    .route("/:id")
    .patch(multer_middleware_1.upload.single("image"), user_controller_1.updateUser)
    .delete(user_controller_1.deleteUser);
exports.default = router;
