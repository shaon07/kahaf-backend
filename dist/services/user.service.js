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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const user_repo_1 = require("../repository/user.repo");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const userSchema_1 = require("../schema/userSchema");
const zodErrorHandler_1 = require("../utils/zodErrorHandler");
const constants_1 = require("../constants");
const cloudinary_1 = require("../utils/cloudinary");
const secrets_1 = require("../secrets");
const userService = {
    getAllUser: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = constants_1.DEFAULT_PAGE, take = constants_1.DEFAULT_LIMIT) {
        try {
            const users = yield (0, user_repo_1.findMany)(page, take);
            return users;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    getUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_repo_1.findUnique)(id);
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw Error("User not found");
            }
            return user;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    createUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            userSchema_1.createUserSchema.parse(data);
            const existingUser = yield (0, user_repo_1.findOne)({
                email: data.email,
                username: data.username,
            });
            if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.id) {
                throw Error("User already exists with this email or username");
            }
            if (data === null || data === void 0 ? void 0 : data.image) {
                const image = yield (0, cloudinary_1.uploadOnCloudinary)(data.image);
                if (!(image === null || image === void 0 ? void 0 : image.url)) {
                    throw Error("Failed to upload image to cloudinary");
                }
                data.image = image === null || image === void 0 ? void 0 : image.url;
            }
            data.password = bcryptjs_1.default.hashSync(data.password, constants_1.SALT);
            const user = yield (0, user_repo_1.create)(data);
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw Error("User not created");
            }
            return user;
        }
        catch (error) {
            (0, zodErrorHandler_1.zodErrorHandler)(error);
        }
    }),
    updateUser: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield (0, user_repo_1.findUnique)(id);
            if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id)) {
                throw Error("User not found");
            }
            if (data === null || data === void 0 ? void 0 : data.image) {
                const image = yield (0, cloudinary_1.uploadOnCloudinary)(data.image);
                if (!(image === null || image === void 0 ? void 0 : image.url)) {
                    throw Error("Failed to upload image to cloudinary");
                }
                data.image = image === null || image === void 0 ? void 0 : image.url;
            }
            const user = yield (0, user_repo_1.update)(id, data);
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw Error("User not updated");
            }
            return user;
        }
        catch (error) { }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield (0, user_repo_1.findUnique)(id);
            if (!(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id)) {
                throw Error("User not found");
            }
            const user = yield (0, user_repo_1.deleteUnique)(id);
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw Error("User not deleted");
            }
            return user;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    loginUser: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_repo_1.findOne)({ email, omit: { password: false } });
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw Error("User not found with this email");
            }
            const isPassWordMatch = bcryptjs_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
            if (!isPassWordMatch) {
                throw Error("Incorrect password");
            }
            const accessToken = jsonwebtoken_1.default.sign({
                id: user === null || user === void 0 ? void 0 : user.id,
                email: user === null || user === void 0 ? void 0 : user.email,
                role: user === null || user === void 0 ? void 0 : user.role,
                username: user === null || user === void 0 ? void 0 : user.username,
            }, secrets_1.ACCESS_TOKEN_SECRET, {
                expiresIn: secrets_1.ACCESS_TOKEN_SECRET_EXPIRE_IN,
            });
            const refreshToken = jsonwebtoken_1.default.sign({
                id: user === null || user === void 0 ? void 0 : user.id,
            }, secrets_1.REFRESH_TOKEN_SECRET, {
                expiresIn: secrets_1.REFRESH_TOKEN_SECRET_EXPIRE_IN,
            });
            const updatedUser = yield (0, user_repo_1.update)(user === null || user === void 0 ? void 0 : user.id, { refreshToken });
            if (!(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.id)) {
                throw Error("User not updated");
            }
            return Object.assign(Object.assign({}, updatedUser), { accessToken, refreshToken });
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    logoutUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_repo_1.update)(id, { refreshToken: undefined });
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                throw Error("User not updated");
            }
            return user;
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
    refreshToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!refreshToken) {
                throw Error("Refresh token is required");
            }
            const user = jsonwebtoken_1.default.verify(refreshToken, secrets_1.REFRESH_TOKEN_SECRET);
            if (typeof user === "object" && user !== null) {
                if (!user.id) {
                    throw Error("User not found");
                }
                const accessToken = jsonwebtoken_1.default.sign({
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    username: user === null || user === void 0 ? void 0 : user.username,
                }, secrets_1.ACCESS_TOKEN_SECRET, {
                    expiresIn: secrets_1.ACCESS_TOKEN_SECRET_EXPIRE_IN,
                });
                const refreshToken = jsonwebtoken_1.default.sign({
                    id: user === null || user === void 0 ? void 0 : user.id,
                }, secrets_1.REFRESH_TOKEN_SECRET, {
                    expiresIn: secrets_1.REFRESH_TOKEN_SECRET_EXPIRE_IN,
                });
                const updatedUser = yield (0, user_repo_1.update)(user === null || user === void 0 ? void 0 : user.id, { refreshToken });
                return Object.assign(Object.assign({}, updatedUser), { accessToken, refreshToken });
            }
            else {
                throw Error("Invalid token");
            }
        }
        catch (error) {
            throw new ApiError_1.default({
                message: error.message,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            });
        }
    }),
};
exports.default = userService;
