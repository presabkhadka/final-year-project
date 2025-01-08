import { Router, type Request, type Response } from "express";
import explorerMiddleware from "../middleware/explorerMiddleware";
import { adminSignup, admingLogin } from "../controller/adminController";
import {
  explorerLogin,
  explorerSignup,
} from "../controller/explorerController";
const explorerRouter = Router();

explorerRouter.post("/signup", explorerSignup);
explorerRouter.post("/login", explorerLogin);

export { explorerRouter };
