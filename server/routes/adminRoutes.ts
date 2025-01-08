import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import { adminSignup, admingLogin } from "../controller/adminController";
const router = Router();

router.post("/signup", adminSignup);
router.post("/login", admingLogin);

export { router };
