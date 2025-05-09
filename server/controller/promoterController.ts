import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  Donation,
  Notification,
  Otp,
  Promoter,
  Review,
  Treasure,
} from "../db/db";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const client: any = new OAuth2Client(process.env.CLIENT_ID);

interface payload {
  userEmail: string;
}

// promoter signup
export async function promoterSignup(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { tokenId, username, email, password, contact } = req.body;
    const userType = "promoter";

    if (tokenId) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID, // Use environment variable
        });

        const payload = ticket.getPayload();
        if (!payload) {
          res.status(400).json({ msg: "Invalid Google token" });
          return;
        }

        const userEmail = payload.email;
        if (!userEmail) {
          res.status(400).json({ msg: "Email not found in Google account" });
          return;
        }

        const userName = payload.name || "Google User";

        const existingUser = await Promoter.findOne({ userEmail });
        if (existingUser) {
          res.status(409).json({ msg: "User already exists with such email" });
          return;
        }

        await Promoter.create({
          userName,
          userEmail,
          userType,
        });

        res
          .status(200)
          .json({ msg: "Promoter created successfully with Google login" });
      } catch (googleError) {
        console.error("Google verification error:", googleError);
        res.status(400).json({
          msg: "Google authentication failed",
        });
        return;
      }
    } else if (username && email && password && contact) {
      const existingUser = await Promoter.findOne({ userEmail: email });
      if (existingUser) {
        res
          .status(409)
          .json({ msg: "Promoter already exists with such email" });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await Promoter.create({
        userName: username,
        userEmail: email,
        userPassword: hashedPassword,
        userContact: contact,
        userType,
      });

      res.status(200).json({
        msg: "Promoter created successfully with traditional sign-up",
      });
    } else {
      res
        .status(400)
        .json({ msg: "Required fields are missing for traditional sign-up" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ msg: "Something went wrong with the server at the moment" });
  }
}

// promoter login
export async function promoterLogin(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { tokenId, email, password } = req.body;

    if (tokenId) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
          res.status(400).json({ msg: "Invalid Google token" });
          return;
        }

        const userEmail = payload.email;
        let existingUser = await Promoter.findOne({ userEmail });

        if (existingUser?.isVerified != true) {
          await generateOtp(userEmail);
        }

        const jwtToken = jwt.sign(
          { userEmail },
          process.env.JWT_SECRET || "defaultkey"
        );

        res.status(200).json({
          token: jwtToken,
          verificationStatus: existingUser?.isVerified,
        });
        return;
      } catch (error) {
        console.error("Google verification error:", error);
        res.status(400).json({ msg: "Google authentication failed" });
        return;
      }
    }

    if (email && password) {
      const existingUser = await Promoter.findOne({ userEmail: email });

      if (!existingUser) {
        res
          .status(401)
          .json({ msg: "Promoter does not exist with this email" });
        return;
      }

      if (
        !existingUser.userPassword ||
        typeof existingUser.userPassword !== "string"
      ) {
        res.status(401).json({ msg: "Invalid password" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.userPassword
      );
      if (!passwordMatch) {
        res.status(401).json({ msg: "Incorrect password" });
        return;
      }

      const jwtToken = jwt.sign(
        { userEmail: existingUser.userEmail },
        process.env.JWT_SECRET || "defaultkey"
      );

      res.status(200).json({
        token: jwtToken,
        verificationStatus: existingUser.isVerified,
      });
      return;
    }

    res.status(400).json({ msg: "Invalid request, missing login credentials" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
}

// fn for promoter to add a new treasure
export async function addTreasure(req: Request, res: Response) {
  try {
    const {
      treasureName,
      treasureLocation,
      treasureDescription,
      treasureContact,
      treasureType,
      treasureOpeningTime,
      treasureClosingTime,
      latitude,
      longitude,
    } = req.body;
    const treasureImage = req.file ? `/uploads/${req.file.filename}` : null;

    const user = req.user;

    const requiredFields = [
      "treasureName",
      "treasureLocation",
      "treasureDescription",
      "treasureContact",
      "treasureType",
      "treasureOpeningTime",
      "treasureClosingTime",
      "latitude",
      "longitude",
    ];
    const isEmpty = requiredFields.some((field) => !req.body[field]?.trim());
    const isImageMissing = !treasureImage;

    if (isEmpty || isImageMissing) {
      res.status(400).json({ msg: "Input fields cannot be left empty" });
      return;
    }

    const existingTreasure = await Treasure.findOne({ treasureName });
    if (existingTreasure) {
      res.status(409).json({ msg: "Treasure already exists" });
      return;
    }

    const promoter = await Promoter.findOne({ userEmail: user });

    const newTreasure = await Treasure.create({
      treasureName,
      treasureLocation,
      treasureDescription,
      treasureContact,
      treasureType,
      treasureImage,
      openingTime: treasureOpeningTime,
      closingTime: treasureClosingTime,
      owner: promoter?._id,
      latitude,
      longitude,
    });

    await Promoter.updateOne(
      { userEmail: user },
      {
        $push: { addedTreasure: newTreasure._id },
        $inc: { points: 10 },
      }
    );

    res.status(201).json({
      msg: "Treasure created successfully",
      newTreasure,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong with the server" });
  }
  return;
}

// fn for promoter to update existing treasure
export async function updateTreasure(req: Request, res: Response) {
  try {
    const treasureId = req.params.treasureId;
    const {
      treasureName,
      treasureLocation,
      treasureDescription,
      treasureType,
    } = req.body;
    const treasureImage = req.file ? `/uploads/${req.file.filename}` : null;

    const fieldsToUpdate: Record<string, any> = {};

    if (treasureName) fieldsToUpdate.treasureName = treasureName;
    if (treasureLocation) fieldsToUpdate.treasureLocation = treasureLocation;
    if (treasureDescription)
      fieldsToUpdate.treasureDescription = treasureDescription;
    if (treasureType) fieldsToUpdate.treasureType = treasureType;
    if (treasureImage) fieldsToUpdate.treasureImage = treasureImage;

    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).json({
        msg: "no fields to update",
      });
      return;
    }

    const result = await Treasure.updateOne(
      { _id: treasureId },
      { $set: fieldsToUpdate }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({
        msg: "treasure not found",
      });
      return;
    }

    res.status(200).json({
      msg: "treasure updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while updating the treasure",
    });
  }
}

// fn for generating otp to promoter
export const generateOtp = async (userEmail: string): Promise<void> => {
  const otp = otpGenerator.generate(4, {
    digits: true,
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
  });

  await Otp.create({
    email: userEmail,
    otp: otp,
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
    to: userEmail,
    subject: "Verify as a promoter in Urban Discoveries",
    // text: `Your OTP for verification is: ${otp}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background: #ffffff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
      
      <div style="background: linear-gradient(90deg, #007BFF, #00ADEF); padding: 15px; border-radius: 10px 10px 0 0;">
        <h2 style="color: #ffffff; margin: 0;">Urban Discoveries</h2>
        <p style="color: #ffffff; font-size: 14px;">OTP Verification</p>
      </div>
  
      <div style="padding: 20px;">
        <p style="font-size: 16px; color: #333;">Hello,</p>
        <p style="font-size: 16px; color: #555;">Your OTP for verification is:</p>
        
        <p style="font-size: 32px; font-weight: bold; color: #007BFF; background: #F0F8FF; display: inline-block; padding: 10px 20px; border-radius: 8px; letter-spacing: 3px;">
          ${otp}
        </p>
  
        <p style="font-size: 14px; color: #555; margin-top: 15px;">
          This OTP is valid for only <strong style="color: #ff4500;">5 minutes</strong>. Do not share it with anyone.
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
};

// fn for verifying otp
export async function verifyOtp(req: Request, res: Response) {
  try {
    const user = req.user;
    let inputOTP = req.body.inputOTP;
    const dbOTP = await Otp.findOne({
      email: user,
    });

    const generatedOTP = dbOTP?.otp;

    if (inputOTP == generatedOTP) {
      try {
        await Promoter.updateOne(
          {
            userEmail: user,
          },
          {
            $set: { isVerified: "true" },
          }
        );
        res.status(200).json({
          msg: "promoter verified successfully",
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          msg: "something went wrong while verifying the promoter",
        });
        return;
      }
    } else {
      res.status(400).json({
        msg: "invald otp",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something went wrong while verifying the otp",
    });
  }
}

// fn for regenerating otp
export async function regenOTP(req: Request, res: Response) {
  try {
    const user = req.user;
    const userEmail = user as string;
    await Otp.deleteMany({
      email: userEmail,
    });
    generateOtp(userEmail);
    res.status(200).json({
      msg: "check you email for regenerated otp",
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while generating the otp",
    });
  }
}

// fn for getting total treasures of promoter
export async function totalTreasures(req: Request, res: Response) {
  try {
    const user = req.user;
    let promoter = await Promoter.findOne({
      userEmail: user,
    });
    let totalTreasure = promoter?.addedTreasure.length;
    res.status(200).json({
      totalTreasure,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while getting the total treasures",
    });
  }
}

// fn for getting good rated treasures
export async function goodRatedTreasures(req: Request, res: Response) {
  try {
    const user = req.user;
    const promoter = await Promoter.findOne({
      userEmail: user,
    });

    const treasure = await Treasure.find({
      owner: promoter?._id,
    });

    const treasureIds = treasure.map((t) => t._id);

    const goodTreasures = await Review.find({
      reviewOf: { $in: treasureIds },
    })
      .where("reviewType")
      .equals("good");

    const goodTreasuresLength = goodTreasures.length;

    res.status(200).json({
      goodTreasuresLength,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error while finding the good treasures",
    });
  }
}

// fn for getting bad rated treasures
export async function badRatedTreasures(req: Request, res: Response) {
  try {
    const user = req.user;
    const promoter = await Promoter.findOne({
      userEmail: user,
    });

    const treasures = await Treasure.find({
      owner: promoter?._id,
    });

    const treasureIds = treasures.map((t) => t._id);

    const badReviews = await Review.find({
      reviewOf: { $in: treasureIds },
    })
      .where("reviewType")
      .equals("bad");

    const badTreasuresLenght = badReviews.length;
    res.status(200).json({
      badTreasuresLenght,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while finding the bad rated treasures",
    });
  }
}

// fn for getting promoter ranking
export const promoterRanking = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const promoters = await Promoter.find();

    const rankings = await Promise.all(
      promoters.map(async (promoter) => {
        const treasureCount = await Treasure.countDocuments({
          promoter: promoter._id,
        });
        return { promoter: promoter.userEmail, treasureCount };
      })
    );

    rankings.sort((a, b) => b.treasureCount - a.treasureCount);

    res.status(200).json({ rankings });
  } catch (error) {
    console.error("Error fetching promoter rankings:", error);
    res.status(500).json({
      message: "Something went wrong while fetching the promoter rank",
    });
  }
};

// fn for getting table details of treasure
export async function treasureDetails(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(500).json({
        msg: "user not found",
      });
    }

    const currentUser = await Promoter.findOne({
      userEmail: user,
    });

    const promoter = await currentUser?._id;

    const treasures = await Treasure.find({
      owner: promoter,
    });
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
          name: treasure.treasureName,
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

    res.status(200).json({ success: true, treasures: treasureData });
  } catch (error) {
    console.error("Error fetching treasure reviews:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the table data",
    });
  }
}

// fn for getting card details of treasures
export async function cardDetails(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        msg: "unauthorized promoter",
      });
      return;
    }
    const promoter = await Promoter.findOne({
      userEmail: user,
    });

    const treasures = await Treasure.find({
      owner: promoter,
    });
    res.status(200).json({
      treasures,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the card details",
    });
  }
}

// fn for gettin promoter details
export async function promoterDetails(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        msg: "unauthorized promoter",
      });
      return;
    }
    const promoter = await Promoter.findOne({
      userEmail: user,
    });
    res.status(200).json({
      promoter,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the promoter details",
    });
  }
}

// fn for deleting bad reviewed treasuers
export async function deleteTreasures(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        msg: "unauthorized user",
      });
      return;
    }
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

    if (treasureExists) {
      await Treasure.deleteOne({
        _id: treasureId,
      });

      await Review.deleteMany({
        reviewOf: treasureId,
      });

      await Promoter.updateOne(
        {
          userEmail: user,
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
  } catch (error) {
    if(error instanceof Error){
      res.status(500).json({
        msg: error.message
      })
    }
  }
}

// fn for fetching top 3 treasures of a promoter
export async function topTreasures(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      msg: "invalid authorization",
    });
    return;
  }
  try {
    let promoter = await Promoter.findOne({
      userEmail: user,
    });

    let topTreasure = await Treasure.find({
      owner: promoter?._id,
    })
      .select("treasureName treasureLocation treasureType visitors")
      .sort({
        visitors: -1,
      });

    res.status(200).json({
      topTreasure,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong while fetching the top 3 treasures",
    });
  }
}

// fn for fetching a particular treasure
export async function particularTreasure(req: Request, res: Response) {
  try {
    const treasureId = req.params.treasureId;
    if (!treasureId) {
      res.status(400).json({
        msg: "no treasure id in params",
      });
      return;
    }
    let treasure = await Treasure.findOne({
      _id: treasureId,
    });

    if (!treasure) {
      res.status(404).json({
        msg: "treasure not found",
      });
      return;
    }

    res.status(200).json({
      treasure,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

// fn for fetching notifications
export async function getNotifications(req: Request, res: Response) {
  try {
    let user = req.user;
    let currentUser = await Promoter.findOne({
      userEmail: user,
    });
    let promoterId = await currentUser?._id;

    let notifications = await Notification.find({
      userId: promoterId,
    });

    if (notifications.length === 0) {
      res.status(200).json({
        msg: "No notification at the moment",
      });
      return;
    }

    res.status(200).json({
      notifications,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

// fn for deleting the notification
export async function deleteNotification(req: Request, res: Response) {
  try {
    let user = req.user;
    let currentUser = await Promoter.findOne({
      userEmail: user,
    });
    let promoterId = await currentUser?._id;

    let notification = await Notification.find({
      userId: promoterId,
    });
    if (notification.length === 0) {
      res.status(200).json({
        msg: "No notifications there to delete at the moment",
      });
      return;
    } else {
      await Notification.deleteMany({ userId: promoterId });
      res.status(200).json({
        msg: "Notifications cleared successfully",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}

// fn for fetching realted donation campaigns
export default async function relatedCampaigns(req: Request, res: Response) {
  try {
    let user = req.user;
    if (!user) {
      res.status(401).json({
        msg: "Unauthorized access",
      });
      return;
    }
    let promoter = await Promoter.findOne({
      userEmail: user,
    });

    let promoterId = await promoter?._id;

    let relatedCampaigns = await Donation.find({
      treasureOwner: promoterId,
    });

    if (!relatedCampaigns) {
      res.status(404).json({
        msg: "No any donation campaigns related to your treasured found in our db",
      });
      return;
    }

    res.status(200).json({
      relatedCampaigns,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        msg: error.message,
      });
    }
  }
}
