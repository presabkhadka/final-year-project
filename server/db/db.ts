import mongoose, { mongo } from "mongoose";

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
  userType: String,
});

const promoterSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPassword: String,
  userContact: String,
  userType: String,
  isVerified: Boolean,
  addedTreasure: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treasure",
    },
  ],
});

const adminSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: String,
  adminPassword: String,
  adminContact: String,
});

const treasureSchema = new mongoose.Schema({
  treasureName: String,
  treasureLocation: String,
  treasureDescription: String,
  treasureType: String,
  treasureImage: Buffer,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promoter",
    required: true,
  },
  ratings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
});

const donationSchema = new mongoose.Schema({
  donationTitle: String,
  donationDescription: String,
  donationType: String,
  donationGoal: Number,
  donater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Explorer",
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

export const Explorer = mongoose.model("Explorer", explorerSchema);

export const Promoter = mongoose.model("Promoter", promoterSchema);

export const Admin = mongoose.model("Admin", adminSchema);

export const Treasure = mongoose.model("Treasure", treasureSchema);

export const Donation = mongoose.model("Donation", donationSchema);

export const Review = mongoose.model("Review", reviewSchema);

export const Kyc = mongoose.model("KYC", kycSchema);

module.exports = {
  Explorer,
  Promoter,
  Admin,
  Treasure,
  Donation,
  Review,
  kycSchema,
};
