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

export const issueRoutes = express.Router();

// Create issue
issueRoutes.post("/", verifyToken, createIssue);

// Get issues of repository
issueRoutes.get("/:repoId", getIssues);

// Close issue
issueRoutes.put("/close/:id", verifyToken, closeIssue);

// Get issue by ID
issueRoutes.get("/id/:id", getIssueById);

// Reopen issue
issueRoutes.put("/reopen/:id", verifyToken, reopenIssue);

// Update issue
issueRoutes.put("/:id", verifyToken, updateIssue);

// Delete issue
issueRoutes.delete("/:id", verifyToken, deleteIssue);