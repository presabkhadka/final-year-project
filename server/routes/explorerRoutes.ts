import { Router, type Request, type Response } from "express";
import {
  explorerSignup,
  explorerLogin,
  searchTreasure,
  fetchDonations,
  addReviews,
  exploredTreasures,
} from "../controller/explorerController";
import explorerMiddleware from "../middleware/explorerMiddleware";
const explorerRouter = Router();

explorerRouter.post("/signup", explorerSignup);
explorerRouter.post("/login", explorerLogin);
explorerRouter.get("/search-treasures", explorerMiddleware, searchTreasure);
explorerRouter.get("/donation-campaigns", explorerMiddleware, fetchDonations);
explorerRouter.post("/add-review/:treasureId", explorerMiddleware, addReviews);
explorerRouter.get("/explored-history", explorerMiddleware, exploredTreasures);

export { explorerRouter };
