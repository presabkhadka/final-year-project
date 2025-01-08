import mongoose from "mongoose";

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
});

const adminSchmea = new mongoose.Schema({
  adminName: String,
  adminEmail: String,
  adminPassword: String,
  adminContact: String,
});

export const Explorer = mongoose.model("Explorer", explorerSchema);

export const Promoter = mongoose.model("Promoter", promoterSchema);

export const Admin = mongoose.model("Admin", adminSchmea);

module.exports = {
  Explorer,
  Promoter,
  Admin,
};
