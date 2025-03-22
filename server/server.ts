import express from "express";
import { router } from "./routes/adminRoutes";
import cors from "cors";
import dotenv from "dotenv";
import { explorerRouter } from "./routes/explorerRoutes";
import { promoterRouter } from "./routes/promoterRoutes";
import "./types/index";
import path from "path";

dotenv.config();
const port = 1010;
const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));

// Use the admin routes
app.use("/admin", router);

app.use("/explorer", explorerRouter);

app.use("/promoter", promoterRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
