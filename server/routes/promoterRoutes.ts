import { Router, type Request, type Response } from "express";
import multer from "multer";
import {
  promoterSignup,
  promoterLogin,
  addTreasure,
  updateTreasure,
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
promoterRouter.patch("/update-treasures/:treasureId", promoterMiddleware, updateTreasure);

export { promoterRouter };
