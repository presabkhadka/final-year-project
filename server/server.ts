import express from "express";
import { router } from "./routes/adminRoutes";
import cors from "cors";
import dotenv from "dotenv";
import { explorerRouter } from "./routes/explorerRoutes";
// import { promoterRouter } from "./routes/promoterRoutes";

dotenv.config();
const port = 1010;
const app = express();

app.use(cors());

app.use(express.json());

// Use the admin routes
app.use("/admin", router);

app.use("/explorer", explorerRouter);

// app.use("/promoter", promoterRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
