import express from "express";
import {
  createPR,
  getPRs,
  mergePR,
  getPRById,
  closePR,
  reopenPR,
  updatePR,
  deletePR
} from "../controllers/pullRequestController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const pullRequestRoutes = express.Router();

// Create pull request
pullRequestRoutes.post("/", verifyToken, createPR);

// Get pull requests of repo
pullRequestRoutes.get("/:repoId", getPRs);

// Merge pull request
pullRequestRoutes.put("/merge/:id", verifyToken, mergePR);

// Get PR by ID
pullRequestRoutes.get("/id/:id", getPRById);

// Close PR
pullRequestRoutes.put("/close/:id", verifyToken, closePR);

// Reopen PR
pullRequestRoutes.put("/reopen/:id", verifyToken, reopenPR);

// Update PR
pullRequestRoutes.put("/:id", verifyToken, updatePR);

// Delete PR
pullRequestRoutes.delete("/:id", verifyToken, deletePR);