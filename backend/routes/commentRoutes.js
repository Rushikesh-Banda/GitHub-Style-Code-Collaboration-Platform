import express from "express";
import {
  addComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const commentRoutes = express.Router();

// Add comment
commentRoutes.post("/", verifyToken, addComment);

// Get comments
commentRoutes.get("/:issueId", getComments);

// Get single comment
commentRoutes.get("/id/:id", getCommentById);

// Update comment
commentRoutes.put("/:id", verifyToken, updateComment);

// Delete comment
commentRoutes.delete("/:id", verifyToken, deleteComment);