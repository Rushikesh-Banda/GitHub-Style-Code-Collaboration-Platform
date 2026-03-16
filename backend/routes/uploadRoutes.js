import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import { upload } from "../utils/fileUpload.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const uploadRoutes = express.Router();

// Upload project file
uploadRoutes.post(
  "/",
  verifyToken,
  upload.single("file"),
  uploadFile
);