import express from "express";
import { register, login } from "../controllers/authController.js";

export const authRoutes = express.Router();

// Register user
authRoutes.post("/register", register);

// Login user
authRoutes.post("/login", login);