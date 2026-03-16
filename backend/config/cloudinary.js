import { v2 as cloudinary } from "cloudinary";
import {config} from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
});

export default cloudinary;