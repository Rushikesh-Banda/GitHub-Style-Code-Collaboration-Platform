import express from "express";
import {
  createIssue,
  getIssues,
  closeIssue,
  getIssueById,
  reopenIssue,
  updateIssue,
  deleteIssue
} from "../controllers/issueController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Create issue
router.post("/", verifyToken, createIssue);

// Get issues of repo
router.get("/repo/:repoId", getIssues);

// Get single issue
router.get("/:id", getIssueById);

// Close issue
router.patch("/:id/close", verifyToken, closeIssue);

// Reopen issue
router.patch("/:id/reopen", verifyToken, reopenIssue);

// Update issue
router.put("/:id", verifyToken, updateIssue);

// Delete issue
router.delete("/:id", verifyToken, deleteIssue);

export default router;