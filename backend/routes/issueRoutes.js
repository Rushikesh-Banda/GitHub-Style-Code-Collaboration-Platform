import express from "express";
import {
  createIssue,
  getIssues,
  closeIssue
} from "../controllers/issueController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const issueRoutes = express.Router();

// Create issue
issueRoutes.post("/", verifyToken, createIssue);

// Get issues of repository
issueRoutes.get("/:repoId", getIssues);

// Close issue
issueRoutes.put("/close/:id", verifyToken, closeIssue);