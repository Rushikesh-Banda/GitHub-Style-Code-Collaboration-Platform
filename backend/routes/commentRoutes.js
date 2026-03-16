import express from "express";
import {
  addComment,
  getComments
} from "../controllers/commentController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const commentRoutes = express.Router();

// Add comment
commentRoutes.post("/", verifyToken, addComment);

// Get comments
commentRoutes.get("/:issueId", getComments);
