import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import {
  Admin,
  Donation,
  Explorer,
  Notification,
  Promoter,
  Review,
  Treasure,
} from "../db/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { io, getSocketIdByUserId } from "../socket/socket";
import nodemailer from "nodemailer";

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
export async function addDonation(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({
        msg: "admin not found",
      });
      return;
    }
    let donationTitle = req.body.donationTitle;
    let donationDescription = req.body.donationDescription;
    let donationGoal = req.body.donationGoal;
    let donationQR = req.file ? `/uploads/${req.file.filename}` : null;
    let treasureName = req.body.treasureName;

    if (
      !donationTitle ||
      !donationDescription ||
      !donationGoal ||
      !donationQR ||
      !treasureName
    ) {
      res.status(400).json({
        msg: "please make sure none of the input fields are empty",
      });
      return;
    }

    let treasure = await Treasure.findOne({
      treasureName,
    });

    if (!treasure) {
      res.status(404).json({
        msg: "no such treasure found in our db",
      });

      return;
    }

    let treasureId = treasure._id;

    let promoterId = await treasure?.owner;

    let promoter = await Promoter.findOne({
      _id: promoterId,
    });

    let promoterEmail = await promoter?.userEmail;

    let exisitingCampaign = await Donation.findOne({
      donationTitle: donationTitle,
    });

    if (exisitingCampaign) {
      res.status(409).json({
        msg: "there already exists a donation with this title",
      });
      return;
    }

    const donation = await Donation.create({
      donationTitle,
      donationDescription,
      donationGoal,
      donationQR,
      treasure: treasureId,
      treasureOwner: promoterId,
    });

    let notification = await Notification.create({
      userId: promoterId,
      message: `Donation campaign created for ${treasureName}`,
    });

    const socketId = await getSocketIdByUserId(promoterEmail!);
    if (socketId) {
      io.to(socketId).emit("donationNotification", notification);
    }

    res.status(200).json({
      donation,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: promoterEmail!,
      subject: "Donation Campaign",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
          
          <div style="background: linear-gradient(90deg, #007BFF, #00ADEF); padding: 15px; border-radius: 10px 10px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">Urban Discoveries</h2>
            <p style="color: #ffffff; font-size: 14px;">Donation Campaign Started</p>
          </div>
      
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #555;">Donation campaign has been started for following treasure:</p>
            
            <p style="font-size: 32px; font-weight: bold; color: #007BFF; background: #F0F8FF; display: inline-block; padding: 10px 20px; border-radius: 8px; letter-spacing: 3px;">
              ${treasureName}
            </p>
      
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="font-size: 12px; color: #777;">
              If you did not request this, please ignore this email or contact support.
            </p>
          </div>
      
          <div style="background: #f8f8f8; padding: 10px; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
            <p>© 2025 Urban Discoveries. All Rights Reserved.</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while creating donation campaign",
    });
  }
}

// fn for seeing active donation campaigns
export async function fetchDonation(req: Request, res: Response) {
  try {
    const activeCampaigns = await Donation.find({});
    if (activeCampaigns.length == 0) {
      res.status(200).json({
        msg: "there is no any active donation campaigns going on",
      });
      return;
    }

    res.status(200).json({
      activeCampaigns,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the donations",
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
    const treasureId = req.params.treasureId;

    if (!treasureId) {
      res.status(404).json({
        msg: "treasure id not found",
      });
      return;
    }

    const treasureExists = await Treasure.findOne({
      _id: treasureId,
    });

    let promoter = await Promoter.findOne({
      addedTreasure: treasureId,
    });

    let promoterEmail = await promoter?.userEmail;

    if (treasureExists) {
      await Treasure.deleteOne({
        _id: treasureId,
      });

      await Review.deleteMany({
        reviewOf: treasureId,
      });

      await Promoter.updateOne(
        {
          userEmail: promoterEmail,
        },
        {
          $pull: {
            addedTreasure: treasureId,
          },
        }
      );

      res.status(200).json({
        msg: "Treasure removed successfully",
      });
    } else {
      res.status(404).json({
        msg: "treasure not found",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: promoterEmail!,
      subject: "Treasure deleted",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
          
          <div style="background: linear-gradient(90deg, #007BFF, #00ADEF); padding: 15px; border-radius: 10px 10px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">Urban Discoveries</h2>
            <p style="color: #ffffff; font-size: 14px;">Treasure Deletion</p>
          </div>
      
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Hello,</p>
            <p style="font-size: 16px; color: #555;">Your following treasure is deleted:</p>
            
            <p style="font-size: 32px; font-weight: bold; color: #007BFF; background: #F0F8FF; display: inline-block; padding: 10px 20px; border-radius: 8px; letter-spacing: 3px;">
              ${treasureExists?.treasureName}
            </p>
      
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="font-size: 12px; color: #777;">
              If you did not request this, please ignore this email or contact support.
            </p>
          </div>
      
          <div style="background: #f8f8f8; padding: 10px; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
            <p>© 2025 Urban Discoveries. All Rights Reserved.</p>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong while removing the treasure",
    });
  }
}

// fn for getting total explorer
export async function totalExplorer(req: Request, res: Response) {
  try {
    const explorers = await Explorer.find({});
    const totalExplorers = explorers.length;
    res.status(200).json({
      totalExplorers,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while finding the total explorer",
    });
  }
}

// fn for getting total promoter
export async function totalPromoter(req: Request, res: Response) {
  try {
    const promoter = await Promoter.find({});
    const totalPromoter = promoter.length;
    res.status(200).json({
      totalPromoter,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the total promoters",
    });
  }
}

// fn for getting total treasure
export async function totalTreasure(req: Request, res: Response) {
  try {
    const treasure = await Treasure.find({});
    const totalTreasure = treasure.length;
    res.status(200).json({
      totalTreasure,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the total treasure",
    });
  }
}

// fn for getting admin details
export async function adminDetails(req: Request, res: Response) {
  try {
    const user = req.user;
    const admin = await Admin.findOne({
      adminEmail: user,
    });
    if (!admin) {
      res.status(404).json({
        msg: "admin not found",
      });
      return;
    }
    res.status(200).json({
      admin,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the admin details",
    });
  }
}

// fn for getting table details in admin reviews
export async function treasureReviews(req: Request, res: Response) {
  try {
    const user = req?.user;
    if (!user) {
      res.status(404).json({
        msg: "no user found",
      });
      return;
    }
    const treasures = await Treasure.find({}).populate(
      "owner",
      "userName userEmail"
    );

    const treasureData = await Promise.all(
      treasures.map(async (treasure) => {
        const goodReviews = await Review.countDocuments({
          reviewOf: treasure._id,
          reviewType: "good",
        });

        const badReviews = await Review.countDocuments({
          reviewOf: treasure._id,
          reviewType: "bad",
        });

        return {
          _id: treasure._id,
          treasureName: treasure.treasureName,
          treasureLocation: treasure.treasureLocation,
          treasureDescription: treasure.treasureDescription,
          treasureContact: treasure.treasureContact,
          treasureType: treasure.treasureType,
          openingTime: treasure.openingTime,
          closingTime: treasure.closingTime,
          treasureImage: treasure.treasureImage,
          owner: treasure.owner,
          positiveReviews: goodReviews,
          negativeReviews: badReviews,
          status:
            goodReviews > badReviews
              ? "Good"
              : goodReviews < badReviews
              ? "Bad"
              : "Neutral",
        };
      })
    );

    res.status(200).json({
      treasures: treasureData,
    });
  } catch (error) {
    res.status(500).json({
      nsg: "something went wrong while fetching the table details",
    });
  }
}

// fn for updating donation campaigns
export async function updateCampaign(req: Request, res: Response) {
  try {
    const donationId = req.params.donationId;
    const { donationTitle, donationDescription, donationGoal } = req.body;
    const donationQR = req.file ? `/uploads/${req.file.filename}` : null;

    const fieldsToUpdate: Record<string, any> = {};

    if (donationTitle) fieldsToUpdate.donationTitle = donationTitle;
    if (donationDescription)
      fieldsToUpdate.donationDescription = donationDescription;
    if (donationGoal) fieldsToUpdate.donationGoal = donationGoal;
    if (donationQR) fieldsToUpdate.donationQR = donationQR;

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({
        msg: "no fields to update",
      });
      return;
    }

    const result = await Donation.updateOne(
      { _id: donationId },
      { $set: fieldsToUpdate }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({
        msg: "donation not found",
      });
      return;
    }

    res.status(200).json({
      msg: "donation updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while updating the donation",
    });
  }
}

// fn for deleting donation campaigns
export async function deleteCamapign(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        msg: "authorization failed",
      });
      return;
    }
    const donationId = req.params.donationId;
    await Donation.deleteOne({
      _id: donationId,
    });
    res.status(200).json({
      msg: "donation campaign deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while deleting the donation camapaign",
    });
  }
}

// fn for fetching all the treasures
export async function allTreasures(req: Request, res: Response) {
  try {
    let treasures = await Treasure.find({}).populate("owner");
    if (!treasures) {
      res.status(200).json({
        msg: "There are currently no treasure registered",
      });
      return;
    }
    res.status(200).json({
      treasures,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}
