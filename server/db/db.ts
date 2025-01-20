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

const treasureScema = new mongoose.Schema({
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
});

const donationSchema = new mongoose.Schema({
  donationType: String,
  donationAmount: Number,
  donater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Explorer",
  },
});

export const Explorer = mongoose.model("Explorer", explorerSchema);

export const Promoter = mongoose.model("Promoter", promoterSchema);

export const Admin = mongoose.model("Admin", adminSchema);

export const Treasure = mongoose.model("Treasure", treasureScema);

export const Donation = mongoose.model("Donation", donationSchema);

module.exports = {
  Explorer,
  Promoter,
  Admin,
  Treasure,
  Donation,
};
