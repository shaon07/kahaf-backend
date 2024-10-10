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
exports.deleteUnique = exports.update = exports.create = exports.findOne = exports.findUnique = exports.findMany = void 0;
const constants_1 = require("../constants");
const prisma_1 = require("../prisma");
const findMany = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT) {
    const users = yield prisma_1.prisma.user.paginate({
        page,
        limit: take,
        omit: {
            password: true,
            refreshToken: true,
        },
    });
    return users;
});
exports.findMany = findMany;
const findUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user
        .findUnique({
        where: { id },
        omit: {
            password: true,
            refreshToken: true,
        },
    })
        .catch((err) => {
        throw Error(err.message);
    });
    return user;
});
exports.findUnique = findUnique;
const findOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const omit = (_a = data === null || data === void 0 ? void 0 : data.omit) !== null && _a !== void 0 ? _a : { password: true };
    const user = yield prisma_1.prisma.user
        .findFirst({
        where: {
            OR: [{ email: data.email }, { username: data.username }],
        },
        omit: omit,
    })
        .catch((err) => {
        throw Error(err.message);
    });
    return user;
});
exports.findOne = findOne;
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user
        .create({
        data: data,
        omit: {
            password: true,
            refreshToken: true,
        },
    })
        .catch((err) => {
        throw Error(err.message);
    });
    return user;
});
exports.create = create;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user
        .update({
        where: { id },
        data: data,
        omit: {
            password: true,
            refreshToken: true,
        },
    })
        .catch((err) => {
        console.log(err);
        throw Error(err.message);
    });
    return user;
});
exports.update = update;
const deleteUnique = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user
        .delete({
        where: { id },
        omit: {
            password: true,
            refreshToken: true,
        },
    })
        .catch((err) => {
        throw Error(err.message);
    });
    return user;
});
exports.deleteUnique = deleteUnique;
