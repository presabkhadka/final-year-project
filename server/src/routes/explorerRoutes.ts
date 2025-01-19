import { Router, type Request, type Response } from "express";
import {
  explorerLogin,
  explorerSignup,
} from "../controller/explorerController";
const explorerRouter = Router();

explorerRouter.post("/signup", explorerSignup);
explorerRouter.post("/login", explorerLogin);

export { explorerRouter };
