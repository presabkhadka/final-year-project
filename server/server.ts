import express from "express";
import { router } from "./routes/adminRoutes";
import cors from "cors";
import dotenv from "dotenv";
import { explorerRouter } from "./routes/explorerRoutes";
import { promoterRouter } from "./routes/promoterRoutes";
import "./types/index";
import path from "path";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import { initializeSocket } from "./socket/socket"; 

dotenv.config();
const port = 1010;
const app = express();

const server = createServer(app); 

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

app.use("/admin", router);
app.use("/explorer", explorerRouter);
app.use("/promoter", promoterRouter);

server.listen(port, '127.0.0.1', () => {
  console.log(`Server running on port ${port}`);

  initializeSocket(server);
});
