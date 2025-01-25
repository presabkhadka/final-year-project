import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import {
  adminSignup,
  adminLogin,
  addDonation,
  reviewReviews,
  deleteTreasures,
} from "../controller/adminController";
import multer from "multer";
const router = Router();

const upload = multer({ dest: "upload/" });

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post(
  "/add-donation-campaign",
  adminMiddleware,
  upload.single("donationQR"),
  addDonation
);
router.get("/filter-reviews", adminMiddleware, reviewReviews);
router.post("/delete-treasure", adminMiddleware, deleteTreasures);

export { router };
