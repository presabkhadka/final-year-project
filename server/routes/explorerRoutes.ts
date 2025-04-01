import { Router, type Request, type Response } from "express";
import {
  explorerSignup,
  explorerLogin,
  searchTreasure,
  fetchDonations,
  addReviews,
  exploredTreasures,
  leaderboards,
  fetchExplorer,
  fetchTreasure,
  landingTreasures,
} from "../controller/explorerController";
import explorerMiddleware from "../middleware/explorerMiddleware";
const explorerRouter = Router();

explorerRouter.post("/signup", explorerSignup);
explorerRouter.post("/login", explorerLogin);
explorerRouter.get("/search-treasures", explorerMiddleware, searchTreasure);
explorerRouter.get("/donation-campaigns", explorerMiddleware, fetchDonations);
explorerRouter.post("/add-review/:treasureId", explorerMiddleware, addReviews);
explorerRouter.get("/explored-history", explorerMiddleware, exploredTreasures);
explorerRouter.get("/leaderboards", explorerMiddleware, leaderboards);
explorerRouter.get("/fetch-details", explorerMiddleware, fetchExplorer);
explorerRouter.get("/fetch-treasures", explorerMiddleware, fetchTreasure);
explorerRouter.get("/landing-treasures", explorerMiddleware, landingTreasures);

export { explorerRouter };
