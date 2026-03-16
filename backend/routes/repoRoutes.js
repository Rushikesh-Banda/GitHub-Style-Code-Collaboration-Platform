import express from "express";
import {
  createRepo,
  getRepos,
  getRepoById,
  deleteRepo
} from "../controllers/repoController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const repoRoutes = express.Router();

// Create repository
repoRoutes.post("/", verifyToken, createRepo);

// Get all repositories
repoRoutes.get("/", getRepos);

// Get single repository
repoRoutes.get("/:id", getRepoById);

// Delete repository
repoRoutes.delete("/:id", verifyToken, deleteRepo);