import express from "express";
import {
  createCommit,
  getCommits,
  getCommitById,
  deleteCommit,
  updateCommitMessage,
  getCommitsByAuthor
} from "../controllers/commitController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const commitRoutes = express.Router();

// Create commit
commitRoutes.post("/", verifyToken, createCommit);

// Get commits for a repository
commitRoutes.get("/:repoId", getCommits);

// Get commit by ID
commitRoutes.get("/id/:id", getCommitById);

// Delete commit
commitRoutes.delete("/:id", verifyToken, deleteCommit);

// Update commit message
commitRoutes.put("/:id", verifyToken, updateCommitMessage);

// Get commits by author
commitRoutes.get("/author/:userId", getCommitsByAuthor);