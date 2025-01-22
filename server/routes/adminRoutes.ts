import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import {
  adminSignup,
  adminLogin,
  addDonation,
} from "../controller/adminController";
const router = Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/add-donation-campaign", adminMiddleware, addDonation);

export { router };
