import express from "express";
import {
  createCommit,
  getCommits
} from "../controllers/commitController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const commitRoutes = express.Router();

// Create commit
commitRoutes.post("/", verifyToken, createCommit);

// Get commits for a repository
commitRoutes.get("/:repoId", getCommits);