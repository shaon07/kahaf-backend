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
exports.deleteUnique = exports.update = exports.create = exports.findByName = exports.findUnique = exports.findMany = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../prisma");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const constants_1 = require("../constants");
const findMany = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* ({ page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT, products = constants_1.DEFAULT_CATEGORY, } = {}) {
    const categories = yield prisma_1.prisma.category.paginate({
        page,
        limit: take,
        include: {
            products: products ? true : false,
        },
    });
    return categories;
});
exports.findMany = findMany;
const findUnique = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, products = 0) {
    return yield prisma_1.prisma.category.findUnique({
        where: { id },
        include: { products: products ? true : false },
    });
});
exports.findUnique = findUnique;
const findByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category.findFirst({
        where: {
            name,
        },
    });
});
exports.findByName = findByName;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category
        .create({
        data,
    })
        .catch((err) => {
        throw new ApiError_1.default({
            message: err.meta.cause,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        });
    });
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.category
        .update({
        where: {
            id: id,
        },
        data: data,
    })
        .catch((err) => {
        throw new ApiError_1.default({
            message: err.meta.cause,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        });
    });
});
exports.update = update;
const deleteUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.category
        .delete({
        where: { id },
    })
        .catch((err) => {
        throw new ApiError_1.default({
            message: err.meta.cause,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
        });
    });
});
exports.deleteUnique = deleteUnique;
