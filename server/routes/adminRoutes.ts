import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import {
  adminSignup,
  adminLogin,
  reviewReviews,
  deleteTreasures,
  totalExplorer,
  totalPromoter,
  totalTreasure,
  adminDetails,
  treasureReviews,
  addDonation,
  fetchDonation,
  updateCampaign,
  deleteCamapign,
  allTreasures,
} from "../controller/adminController";
import multer from "multer";
import path from "path";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("D:", "final-year-project", "server", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create the multer instance
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post(
  "/add-donation-campaign",
  adminMiddleware,
  upload.single("donationQR"),
  addDonation
);
router.get("/filter-reviews", adminMiddleware, reviewReviews);
router.delete("/delete-treasure/:treasureId", adminMiddleware, deleteTreasures);
router.get("/total-explorer", adminMiddleware, totalExplorer);
router.get("/total-promoter", adminMiddleware, totalPromoter);
router.get("/total-treasure", adminMiddleware, totalTreasure);
router.get("/admin-details", adminMiddleware, adminDetails);
router.get("/treasure-details", adminMiddleware, treasureReviews);
router.get("/active-donation-campaigns", adminMiddleware, fetchDonation);
router.patch(
  "/update-donation-campaign/:donationId",
  upload.single("donationQR"),
  adminMiddleware,
  updateCampaign
);
router.delete(
  "/delete-donation-campaign/:donationId",
  adminMiddleware,
  deleteCamapign
);
router.get("/treasures", adminMiddleware, allTreasures);

export { router };
