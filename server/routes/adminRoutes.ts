import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import {
  adminSignup,
  adminLogin,
  addDonation,
  reviewReviews,
  deleteTreasures,
  totalExplorer,
  totalPromoter,
} from "../controller/adminController";
import multer from "multer";
import path from "path";
const router = Router();

const upload = multer({ dest: path.join(__dirname, "../uploads/") });

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
router.get("/total-explorer", adminMiddleware, totalExplorer);
router.get("/total-promoter", adminMiddleware, totalPromoter);

export { router };
