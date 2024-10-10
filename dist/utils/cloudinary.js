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
exports.uploadOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const secrets_1 = require("../secrets");
cloudinary_1.v2.config({
    cloud_name: secrets_1.CLOUDINARY_CLOUD_NAME,
    api_key: secrets_1.CLOUDINARY_API_KEY,
    api_secret: secrets_1.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file)
        return null;
    const res = yield cloudinary_1.v2.uploader.upload(file, {
        resource_type: "auto",
    });
    fs_1.default.unlinkSync(file);
    return res;
});
exports.uploadOnCloudinary = uploadOnCloudinary;
