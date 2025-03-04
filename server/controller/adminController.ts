import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { Admin, Donation, Review, Treasure } from "../db/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface payload {
  email: string;
}

// admin signup
export async function adminSignup(req: Request, res: Response) {
  try {
    const adminName = req.body.username;
    const adminEmail = req.body.email;
    const adminPassword = req.body.password;
    const adminContact = req.body.contact;
    const existingUser = await Admin.findOne({
      adminEmail,
    });
    if (existingUser) {
      res.status(409).json({
        msg: "admin already excists with this email",
      });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

      await Admin.create({
        adminName,
        adminEmail,
        adminPassword: hashedPassword,
        adminContact,
      });

      res.status(200).json({
        msg: "admin created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something wrong with the server",
    });
  }
}

// admin login
export async function adminLogin(req: Request, res: Response): Promise<void> {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await Admin.findOne({
      adminEmail: email,
    });

    if (!existingUser) {
      res.status(401).json({
        msg: "admin not found",
      });
      return;
    }

    if (typeof existingUser.adminPassword !== "string") {
      res.status(403).json({
        msg: "password is invalid or missing",
      });
      return;
    }

    if (password !== existingUser.adminPassword) {
      res.status(401).json({
        msg: "Invalid credentials",
        success: false,
      });
      return;
    }

    let payload: payload = { email };
    const jwtPass: string = process.env.JWT_SECRET || "defaultkey";

    if (!jwtPass) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    let token = jwt.sign(payload, jwtPass);
    res.status(200).json({
      msg: "Login successful",
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something wrong with the server",
    });
  }
}

// fn for admin to add donation campaign
export async function addDonation(req: Request, res: Response): Promise<void> {
  try {
    const donationTitle = req.body.donationTitle;
    const donationDescription = req.body.donationDescription;
    const donationType = req.body.donationType;
    const donationGoal = req.body.donationGoal;
    const donationQR = req.file?.path;

    const existingDonation = await Donation.findOne({
      donationTitle: donationTitle,
    });

    if (existingDonation) {
      res.status(409).json({
        msg: "a donation for this cause already exists",
      });
      return;
    } else {
      await Donation.create({
        donationTitle,
        donationDescription,
        donationType,
        donationGoal,
        donationQR,
      });
      res.status(200).json({
        msg: "a new donation campaign has successfully been created",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// fn for fetching reviews
export async function reviewReviews(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const goodReviewsCount = await Review.aggregate([
      { $match: { reviewType: "good" } },
      { $group: { _id: "$reviewOf", count: { $sum: 1 } } },
    ]);

    const badReviewsCount = await Review.aggregate([
      { $match: { reviewType: "bad" } },
      { $group: { _id: "$reviewOf", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      goodReviewsCount,
      badReviewsCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong while filtering the reviews",
    });
  }
}

// fn for deleting bad reviewed treasuers
export async function deleteTreasures(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const treasureId = req.body.treasureId;

    if (!treasureId) {
      res.status(404).json({
        msg: "treasure id not found",
      });
      return;
    }

    const treasureExists = await Treasure.findOne({
      _id: treasureId,
    });

    if (treasureExists) {
      await Treasure.deleteOne({
        _id: treasureId,
      });

      await Review.deleteMany({
        reviewOf: treasureId,
      });

      res.status(200).json({
        msg: "Treasure removed successfully",
      });
    } else {
      res.status(404).json({
        msg: "treasure not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong while removing the treasure",
    });
  }
}
