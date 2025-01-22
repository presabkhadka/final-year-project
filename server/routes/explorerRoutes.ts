import { Router, type Request, type Response } from "express";
import {
  explorerSignup,
  explorerLogin,
  searchTreasure,
  fetchDonations,
} from "../controller/explorerController";
import explorerMiddleware from "../middleware/explorerMiddleware";
const explorerRouter = Router();

explorerRouter.post("/signup", explorerSignup);
explorerRouter.post("/login", explorerLogin);
explorerRouter.get("/search-treasures", explorerMiddleware, searchTreasure);
explorerRouter.get("/donation-campaigns", explorerMiddleware, fetchDonations);

export { explorerRouter };
