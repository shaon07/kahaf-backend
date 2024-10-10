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
exports.refreshToken = exports.logout = exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const services_1 = require("../services");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const constants_1 = require("../constants");
const configs_1 = require("../configs");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
exports.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT } = req.query;
    const users = yield services_1.userService.getAllUser(Number(page), Number(take));
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        data: users,
        message: "Users fetched successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
    }));
}));
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const user = yield services_1.userService.getUser(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        data: user,
        message: "User fetched successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
    }));
}));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    payload.image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const user = yield services_1.userService.createUser(payload);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(new ApiResponse_1.default({
        data: user,
        message: "User created successfully",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
    }));
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = req.body;
    payload.image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
    const user = yield services_1.userService.updateUser(req.params.id, payload);
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        data: user,
        message: "User updated successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
    }));
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield services_1.userService.deleteUser(id);
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        data: user,
        message: "User deleted successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
    }));
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield services_1.userService.loginUser(email, password);
    res.cookie("accessToken", user.accessToken, configs_1.cookieConfig);
    res.cookie("refreshToken", user.refreshToken, configs_1.cookieConfig);
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        data: user,
        message: "User logged in successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
    }));
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    yield services_1.userService.logoutUser(id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        message: "User logged out successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {},
    }));
}));
exports.refreshToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    const token = req.cookies.refreshToken;
    if (!token && !refreshToken) {
        throw new ApiError_1.default({
            message: "Invalid refresh token",
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
        });
    }
    const user = yield services_1.userService.refreshToken(token || refreshToken);
    res.cookie("accessToken", user.accessToken, configs_1.cookieConfig);
    res.cookie("refreshToken", user.refreshToken, configs_1.cookieConfig);
    res.status(http_status_codes_1.StatusCodes.OK).json(new ApiResponse_1.default({
        data: user,
        message: "User token refreshed successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
    }));
}));
