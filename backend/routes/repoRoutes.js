import express from "express";
import {
  createRepo,
  getRepos,
  getRepoById,
  deleteRepo,
  updateRepo,
  addCollaborator,
  removeCollaborator,
  updateCollaboratorRole,
  getCollaborators
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

// Update repository
repoRoutes.put("/:id", verifyToken, updateRepo);

// Add collaborator
repoRoutes.post("/:id/collaborators", verifyToken, addCollaborator);

// Remove collaborator
repoRoutes.delete("/:id/collaborators/:userId", verifyToken, removeCollaborator);

// Update collaborator role
repoRoutes.put("/:id/collaborators/:userId", verifyToken, updateCollaboratorRole);

// Get collaborators
repoRoutes.get("/:id/collaborators", getCollaborators);