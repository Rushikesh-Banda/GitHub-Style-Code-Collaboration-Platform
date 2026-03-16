import express from "express";
import {
  createPR,
  getPRs,
  mergePR
} from "../controllers/pullRequestController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const pullRequestRoutes = express.Router();

// Create pull request
pullRequestRoutes.post("/", verifyToken, createPR);

// Get pull requests of repo
pullRequestRoutes.get("/:repoId", getPRs);

// Merge pull request
pullRequestRoutes.put("/merge/:id", verifyToken, mergePR);