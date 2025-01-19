import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import { adminSignup, adminLogin } from "../controller/adminController";
const router = Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

export { router };
