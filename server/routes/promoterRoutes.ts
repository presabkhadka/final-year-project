import { Router, type Request, type Response } from "express";
import { promoterSignup, promoterLogin } from "../controller/promoterController";
const promoterRouter = Router();

promoterRouter.post("/signup", promoterSignup);
promoterRouter.post("/login", promoterLogin)

export { promoterRouter };
