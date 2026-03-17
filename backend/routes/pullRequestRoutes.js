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

const router = express.Router();

// Create pull request
router.post("/", verifyToken, createPR);

// Get PRs of a repository
router.get("/repo/:repoId", getPRs);

// Get single PR
router.get("/:id", getPRById);

// Merge PR
router.patch("/:id/merge", verifyToken, mergePR);

// Close PR
router.patch("/:id/close", verifyToken, closePR);

// Reopen PR
router.patch("/:id/reopen", verifyToken, reopenPR);

// Update PR
router.put("/:id", verifyToken, updatePR);

// Delete PR
router.delete("/:id", verifyToken, deletePR);

export default router;