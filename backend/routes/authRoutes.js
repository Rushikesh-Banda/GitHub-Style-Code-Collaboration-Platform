import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  changePassword
} from "../controllers/authController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

export const authRoutes = express.Router();

/* ---------------- AUTH ROUTES ---------------- */

// Register user
authRoutes.post("/register", register);

// Login user
authRoutes.post("/login", login);

// Logout user
authRoutes.get("/logout", logout);

// Get logged-in user profile
authRoutes.get("/me", verifyToken, getProfile);

// Change password
authRoutes.put("/change-password", verifyToken, changePassword);

/* --------------------------------------------- */