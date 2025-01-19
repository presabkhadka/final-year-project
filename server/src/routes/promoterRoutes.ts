import { Router, type Request, type Response } from "express";
import explorerMiddleware from "../middleware/explorerMiddleware";
import {
  promoterLogin,
  promoterSignup,
} from "../controller/promoterController";
const promoterRouter = Router();

promoterRouter.post("/signup", promoterSignup);
promoterRouter.post("/login", promoterLogin);

export { promoterRouter };
