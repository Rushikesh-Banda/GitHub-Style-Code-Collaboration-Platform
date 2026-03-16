import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";

import { connectToDB } from "./config/db.js";
import { startSocket } from "./sockets/socketServer.js";
import testRouter from "./routes/testRoutes.js";   // ✅ add this

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ✅ register router
app.use("/api/test", testRouter);

connectToDB();

const server = http.createServer(app);

startSocket(server);

server.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});