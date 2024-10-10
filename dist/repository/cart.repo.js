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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.deleteUnique = exports.update = exports.create = exports.findUnique = exports.findMany = void 0;
const constants_1 = require("../constants");
const prisma_1 = require("../prisma");
const findMany = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT) {
    try {
        const cart = yield prisma_1.prisma.cart.paginate({
            limit: take,
            page: page,
            include: {
                products: true,
            },
        });
        return cart;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.findMany = findMany;
const findUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield prisma_1.prisma.cart.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });
        return cart;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.findUnique = findUnique;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, products } = data;
    try {
        const cart = prisma_1.prisma.cart.create({
            data: {
                userID,
                products: {
                    create: [...products],
                },
            },
        });
        return cart;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = data;
        yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma_1.prisma.cartItem.updateMany({
                where: {
                    cartID: id,
                    productID: product.productID,
                },
                data: {
                    quantity: product.quantity,
                },
            });
        })));
        const updatedCart = yield prisma_1.prisma.cart.findUnique({
            where: {
                id,
            },
            include: {
                products: true, // include related CartItems in the response
            },
        });
        return updatedCart;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.update = update;
const deleteUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield prisma_1.prisma.cart.delete({
            where: {
                id,
            },
        });
        return cart;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.deleteUnique = deleteUnique;
const findOne = (data_1, ...args_1) => __awaiter(void 0, [data_1, ...args_1], void 0, function* (data, page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT) {
    try {
        const cart = yield prisma_1.prisma.cart.paginate({
            where: {
                OR: [{ userID: data.userID }, { id: data.cartID }],
            },
            include: {
                products: true,
            },
            limit: take,
            page: page,
        });
        return cart;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.findOne = findOne;
