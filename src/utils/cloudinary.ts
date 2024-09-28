import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../secrets";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file: any) => {
  if (!file) return null;

  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  fs.unlinkSync(file);
  return res;
};
