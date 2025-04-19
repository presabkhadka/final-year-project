import mongoose, { mongo } from "mongoose";
import { DefaultDeserializer } from "v8";

// connecting database
mongoose.connect(
  "mongodb+srv://presabkhadka30:fRANqisUqmoJ5AkK@cluster0.g6wpo.mongodb.net/urban_discoveries"
);

// defining schemas
const explorerSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userContact: String,
  profilePicture: String,
  userType: {
    type: String,
    enum: ["explorer"],
  },
  exploredHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treasure",
    },
  ],
});

const promoterSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userContact: String,
  profilePicture: String,
  userType: {
    type: String,
    enum: ["promoter"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  addedTreasure: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treasure",
    },
  ],
  points: Number,
});

const adminSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: String,
  adminPassword: String,
  adminContact: String,
  profilePicture: String,
});

const treasureSchema = new mongoose.Schema({
  treasureName: String,
  treasureLocation: String,
  treasureDescription: String,
  treasureContact: String,
  treasureType: String,
  openingTime: String,
  closingTime: String,
  treasureImage: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promoter",
    required: true,
  },
  ratings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  visitors: Number,
  latitude: String,
  longitude: String,
});

const donationSchema = new mongoose.Schema({
  donationTitle: String,
  donationDescription: String,
  donationGoal: String,
  donationQR: String,
  donater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Explorer",
  },
  treasure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treasure",
  },
  treasureOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promoter",
  },
});

const reviewSchema = new mongoose.Schema({
  reviewType: {
    type: String,
    enum: ["good", "bad"],
    required: true,
  },
  reviewComments: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Explorer",
  },
  reviewOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treasure",
  },
});

const kycSchema = new mongoose.Schema({
  kycPhoto: Buffer,
  kycDetail: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promoter",
  },
});

const otpSchema = new mongoose.Schema({
  email: String,
  otp: Number,
  createdAt: {
    type: Date,
    expires: "5m",
    default: Date.now,
  },
});

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  message: String,
});

export const Explorer = mongoose.model("Explorer", explorerSchema);

export const Promoter = mongoose.model("Promoter", promoterSchema);

export const Admin = mongoose.model("Admin", adminSchema);

export const Treasure = mongoose.model("Treasure", treasureSchema);

export const Donation = mongoose.model("Donation", donationSchema);

export const Review = mongoose.model("Review", reviewSchema);

export const Kyc = mongoose.model("KYC", kycSchema);

export const Otp = mongoose.model("OTP", otpSchema);

export const Notification = mongoose.model("Notification", notificationSchema);

module.exports = {
  Explorer,
  Promoter,
  Admin,
  Treasure,
  Donation,
  Review,
  kycSchema,
  Otp,
  Notification,
};
