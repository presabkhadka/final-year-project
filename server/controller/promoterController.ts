import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Otp, Promoter, Review, Treasure } from "../db/db";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

dotenv.config();

interface payload {
  userEmail: string;
}

// promoter signup
export async function promoterSignup(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userContact = req.body.contact;
    const userType = req.body.type;

    const existingUser = await Promoter.findOne({
      userEmail: userEmail,
    });

    if (
      userName == "" ||
      userEmail == "" ||
      userPassword == "" ||
      userContact == "" ||
      userType == ""
    ) {
      res.status(401).json({
        msg: "input fields cannot be left empty",
      });
      return;
    }

    if (existingUser) {
      res.status(409).json({
        msg: "promoter already exists with such email",
      });
      return;
    } else {
      let saltRounds = 10;
      let hashedPassword = await bcrypt.hash(userPassword, saltRounds);

      await Promoter.create({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userContact,
        userType,
      });
      generateOtp(userEmail);

      res.status(200).json({
        msg: "promoter created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// promoter login
export async function promoterLogin(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const existingUser = await Promoter.findOne({
      userEmail,
    });

    if (userEmail == "" || userPassword == "") {
      res.json(403).json({
        msg: "input fields cannot be left empty",
      });
      return;
    }

    if (!existingUser) {
      res.status(401).json({
        msg: "promoter doesnt exist with such email",
      });
      return;
    } else {
      if (typeof existingUser.userPassword !== "string") {
        res.status(401).json({
          msg: "password invalid or missing",
        });
        return;
      }

      let passwordMatch = await bcrypt.compare(
        userPassword,
        existingUser.userPassword
      );

      if (!passwordMatch) {
        res.status(401).json({
          msg: "password doesn't matches",
        });
        return;
      }

      let verificationStatus = existingUser.isVerified;

      let payload: payload = { userEmail };
      let token = jwt.sign(payload, process.env.JWT_SECRET || "defaultkey");

      res.status(200).json({
        token,
        verificationStatus,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// fn for promoter to add a new treasure
export async function addTreasure(req: Request, res: Response) {
  try {
    const treasureName = req.body.treasureName;
    const treasureLocation = req.body.treasureLocation;
    const treasureDescription = req.body.treasureDescription;
    const treasureType = req.body.treasureType;
    const treasureImage = req.file?.path;
    const user = req.user;

    const promoter = await Promoter.findOne({ userEmail: user });

    const existingTreasure = await Treasure.findOne({
      treasureName,
    });

    if (
      treasureName == "" ||
      treasureLocation == "" ||
      treasureDescription == "" ||
      treasureType == "" ||
      treasureImage == ""
    ) {
      res.status(400).json({
        msg: "input fields cannot be left empty",
      });
    }

    if (existingTreasure) {
      res.status(409).json({
        msg: "treasure already exists",
      });
    } else {
      const newTreasure = await Treasure.create({
        treasureName,
        treasureLocation,
        treasureDescription,
        treasureType,
        treasureImage,
        owner: promoter?._id,
      });
      res.status(200).json({
        msg: "treasure created successfully",
        newTreasure,
      });

      await Promoter.updateOne(
        {
          userEmail: user,
        },
        {
          $push: {
            addedTreasure: newTreasure._id,
          },
          $inc: {
            points: 10,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// fn for promoter to update existing treasure
export async function updateTreasure(req: Request, res: Response) {
  try {
    const treasureId = req.params.treasureId;
    const treasureName = req.body.treasureName;
    const treasureLocation = req.body.treasureLocation;
    const treasureDescription = req.body.treasureDescription;
    const treasureType = req.body.treasureType;
    const treasureImage = req.file?.path;

    if (
      treasureName == "" ||
      treasureLocation == "" ||
      treasureDescription == "" ||
      treasureType == "" ||
      treasureImage == ""
    ) {
      res.status(401).json({
        msg: "treasure details cannot be left empty",
      });
    }

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

    await Treasure.updateOne(
      {
        _id: treasureId,
      },
      {
        $set: fieldsToUpdate,
      }
    );

    res.status(200).json({
      msg: "treasure updated successfully",
    });
  } catch (error) {
    console.log(error);
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
    text: `Your OTP for verification is: ${otp}`,
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

    const goodTreasuresLength = goodTreasures.length

    res.status(200).json({
      goodTreasuresLength
    });
  } catch (error) {
    res.status(500).json({
      msg: "error while finding the good treasures",
    });
  }
}

// fn for getting promoter ranking
export async function promoterRankinng(req: Request, res: Response) {
  const user = req.user;
}
