import { Router, type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import relatedCampaigns, {
  promoterSignup,
  promoterLogin,
  addTreasure,
  updateTreasure,
  verifyOtp,
  regenOTP,
  totalTreasures,
  goodRatedTreasures,
  badRatedTreasures,
  promoterRanking,
  treasureDetails,
  cardDetails,
  promoterDetails,
  deleteTreasures,
  topTreasures,
  getNotifications,
  deleteNotification,
} from "../controller/promoterController";
import promoterMiddleware from "../middleware/promoterMiddleware";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("D:", "final-year-project", "server", "uploads"));
  },
  filename: function (req, file, cb) {
    // Create unique filename
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
    // Accept only images
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

const promoterRouter = Router();

promoterRouter.post("/signup", promoterSignup);
promoterRouter.post("/login", promoterLogin);
promoterRouter.post(
  "/add-treasure",
  promoterMiddleware,
  upload.single("treasureImage"),
  addTreasure
);
promoterRouter.patch(
  "/update-treasures/:treasureId",
  upload.single("treasureImage"),
  promoterMiddleware,
  updateTreasure
);
promoterRouter.post("/verify-otp", promoterMiddleware, verifyOtp);
promoterRouter.get("/regenerate-otp", promoterMiddleware, regenOTP);
promoterRouter.get("/total-treasure", promoterMiddleware, totalTreasures);
promoterRouter.get("/good-treasures", promoterMiddleware, goodRatedTreasures);
promoterRouter.get("/bad-treasures", promoterMiddleware, badRatedTreasures);
promoterRouter.get("/rankings", promoterMiddleware, promoterRanking);
promoterRouter.get("/treasure-table", promoterMiddleware, treasureDetails);
promoterRouter.get("/card-details", promoterMiddleware, cardDetails);
promoterRouter.get("/promoter-details", promoterMiddleware, promoterDetails);
promoterRouter.delete(
  "/delete-treasures/:treasureId",
  promoterMiddleware,
  deleteTreasures
);
promoterRouter.get("/top-treasures", promoterMiddleware, topTreasures);
promoterRouter.get("/notifications", promoterMiddleware, getNotifications);
promoterRouter.delete(
  "/delete-notifications",
  promoterMiddleware,
  deleteNotification
);
promoterRouter.get("/donation-campaigns", promoterMiddleware, relatedCampaigns);
export { promoterRouter };
