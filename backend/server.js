import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";

import { connectToDB } from "./config/db.js";
import { startSocket } from "./sockets/socketServer.js";

import testRouter from "./routes/testRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { repoRoutes } from "./routes/repoRoutes.js";
import { commitRoutes } from "./routes/commitRoutes.js";
import { pullRequestRoutes } from "./routes/pullRequestRoutes.js";
import { issueRoutes } from "./routes/issueRoutes.js";
import { commentRoutes } from "./routes/commentRoutes.js";
import { uploadRoutes } from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

/* ---------------- API ROUTES ---------------- */

// Test routes
app.use("/api/test", testRouter);

// Authentication
app.use("/api/auth", authRoutes);

// Repository management
app.use("/api/repos", repoRoutes);

// Commit history
app.use("/api/commits", commitRoutes);

// Pull requests
app.use("/api/pull-requests", pullRequestRoutes);

// Issues
app.use("/api/issues", issueRoutes);

// Comments
app.use("/api/comments", commentRoutes);

// File upload
app.use("/api/upload", uploadRoutes);

/* -------------------------------------------- */

connectToDB();

const server = http.createServer(app);

// WebSocket server
startSocket(server);

server.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});

// Store socket instance globally for controllers
const io = startSocket(server);
app.set("io", io);


// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server running",
    time: new Date()
  });
});


// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error"
  });
});


// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});