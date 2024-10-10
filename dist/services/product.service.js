"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const product_repo_1 = require("../repository/product.repo");
const cloudinary_1 = require("../utils/cloudinary");
const productSchema_1 = require("../schema/productSchema");
const zodErrorHandler_1 = require("../utils/zodErrorHandler");
const productService = {
    getProducts: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ category, page, take } = {}) {
        try {
            const products = yield (0, product_repo_1.findMany)({ category, page, take });
            return products;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    getProduct: (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, category = 0) {
        try {
            const product = yield (0, product_repo_1.findUnique)(id, category);
            if (!(product === null || product === void 0 ? void 0 : product.id)) {
                throw Error("Product not found");
            }
            if (Number(category) < 0 || Number(category) > 1) {
                throw Error("Invalid category");
            }
            return product;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    createProduct: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            productSchema_1.createProductSchema.parse(data);
            const productImage = yield (0, cloudinary_1.uploadOnCloudinary)(data.image);
            if (!(productImage === null || productImage === void 0 ? void 0 : productImage.url)) {
                throw new ApiError_1.default({
                    message: "Failed to upload image to cloudinary",
                    statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                });
            }
            data.image = productImage === null || productImage === void 0 ? void 0 : productImage.url;
            const product = yield (0, product_repo_1.create)(data);
            if (!(product === null || product === void 0 ? void 0 : product.id)) {
                throw Error("Product not created");
            }
            return product;
        }
        catch (error) {
            (0, zodErrorHandler_1.zodErrorHandler)(error);
        }
    }),
    updateProduct: (id_1, data_1, ...args_1) => __awaiter(void 0, [id_1, data_1, ...args_1], void 0, function* (id, data, category = 0) {
        try {
            const existingProduct = yield (0, product_repo_1.findUnique)(id);
            if (!(existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.id)) {
                throw Error("Product not found");
            }
            if (data === null || data === void 0 ? void 0 : data.image) {
                const image = yield (0, cloudinary_1.uploadOnCloudinary)(data.image);
                if (!(image === null || image === void 0 ? void 0 : image.url)) {
                    throw Error("Failed to upload image to cloudinary");
                }
                data.image = image === null || image === void 0 ? void 0 : image.url;
            }
            const product = yield (0, product_repo_1.update)(id, data, category);
            if (!(product === null || product === void 0 ? void 0 : product.id)) {
                throw Error("Product not updated");
            }
            return product;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    deleteProduct: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!id) {
                throw Error("Id is required");
            }
            const existingProduct = yield (0, product_repo_1.findUnique)(id);
            if (!(existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.id)) {
                throw Error("Product not found");
            }
            const product = yield (0, product_repo_1.deleteUnique)(id);
            if (!(product === null || product === void 0 ? void 0 : product.id)) {
                throw Error("Product not deleted");
            }
            return product;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
};
exports.default = productService;
