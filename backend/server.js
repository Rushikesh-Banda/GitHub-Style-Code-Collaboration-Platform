import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";

import { connectToDB } from "./config/db.js";
import { startSocket } from "./sockets/socketServer.js";

import testRouter from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import repoRoutes from "./routes/repoRoutes.js";
import commitRoutes from "./routes/commitRoutes.js";
import pullRequestRoutes from "./routes/pullRequestRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import fileRoutes from "./routes/filesRoutes.js";

dotenv.config();

const app = express();


// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


// Health check (keep early)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server running",
    time: new Date()
  });
});


/* ---------------- API ROUTES ---------------- */

// Test
app.use("/api/test", testRouter);

// Auth
app.use("/api/auth", authRoutes);

// Repos
app.use("/api/repos", repoRoutes);

// Commits
app.use("/api/commits", commitRoutes);

// Pull Requests
app.use("/api/pull-requests", pullRequestRoutes);

// Issues
app.use("/api/issues", issueRoutes);

// Comments
app.use("/api/comments", commentRoutes);

// Files (merged upload + DB)
app.use("/api/files", fileRoutes);

/* -------------------------------------------- */


// Connect DB
connectToDB();


// Create HTTP server
const server = http.createServer(app);


// Start socket ONLY ONCE
const io = startSocket(server);
app.set("io", io);


// Start server
const PORT = process.env.PORT ;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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