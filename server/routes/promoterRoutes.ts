import { Router, type Request, type Response } from "express";
import multer from "multer";
import {
  promoterSignup,
  promoterLogin,
  addTreasure,
  updateTreasure,
  verifyOtp,
  regenOTP,
} from "../controller/promoterController";
import promoterMiddleware from "../middleware/promoterMiddleware";

const upload = multer({ dest: "upload/" });

const promoterRouter = Router();

promoterRouter.post("/signup", promoterSignup);
promoterRouter.post("/login", promoterLogin);
promoterRouter.post(
  "/add-treasure",
  promoterMiddleware,
  upload.single("treasureImage"),
  addTreasure
);
promoterRouter.patch(
  "/update-treasures/:treasureId",
  promoterMiddleware,
  updateTreasure
);
promoterRouter.post("/verify-otp", promoterMiddleware, verifyOtp);
promoterRouter.get("/regenerate-otp", promoterMiddleware, regenOTP);

export { promoterRouter };
