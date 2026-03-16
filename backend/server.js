import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";

import {connectToDB} from "./config/db.js";
// import {authRoutes} from "./routes/authRoutes.js";
// import {repoRoutes} from "./routes/repoRoutes.js";
import {startSocket} from "./sockets/socketServer.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use("/auth",authRoutes);
// app.use("/repos",repoRoutes);

connectToDB();

const server=http.createServer(app);

startSocket(server);

server.listen(process.env.PORT,()=>{
console.log("Server running on",process.env.PORT);
});
