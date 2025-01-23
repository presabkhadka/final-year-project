import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { Donation, Explorer, Review, Treasure } from "../db/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface payload {
  userEmail: string;
}

// explorer signup
export async function explorerSignup(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userContact = req.body.contact;
    const userType = req.body.type;

    const existingUser = await Explorer.findOne({
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
        msg: "user alrady exists with this email",
      });
      return;
    } else {
      let saltRounds = 10;
      let hashedPassword = await bcrypt.hash(userPassword, saltRounds);

      await Explorer.create({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userContact,
        userType,
      });

      res.status(200).json({
        msg: "explorer created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// explorer login
export async function explorerLogin(req: Request, res: Response) {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    let existingUser = await Explorer.findOne({
      userEmail: userEmail,
    });

    if (userEmail == "" || userPassword == "") {
      res.status(401).json({
        msg: "input fields cannot be left empty",
      });
      return;
    }

    if (!existingUser) {
      res.status(403).json({
        msg: "no such user found in db",
      });
      return;
    } else {
      if (typeof existingUser.userPassword !== "string") {
        res.status(401).json({
          msg: "password is invalid or missing",
        });
        return;
      }

      let passwordMatch = await bcrypt.compare(
        userPassword,
        existingUser.userPassword
      );

      if (!passwordMatch) {
        res.status(403).json({
          msg: "invalid password",
        });
        return;
      }

      let payload: payload = { userEmail };

      let token = jwt.sign(payload, process.env.JWT_SECRET || "defaultkey");

      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// fn for explorer to search a treasure
export async function searchTreasure(req: Request, res: Response) {
  try {
    const treasureName = req.body.treasureName;
    if (!treasureName) {
      res.status(401).json({
        msg: "treasure name cannot be left empty",
      });
      return;
    }

    const existingTreasure = await Treasure.findOne({
      treasureName: treasureName,
    });

    if (!existingTreasure) {
      res.status(404).json({
        msg: "no such treasure found in the db",
      });
      return;
    } else {
      res.status(200).json({
        existingTreasure,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something is wrong with the server at the moment",
    });
  }
}

// fn for fetching donation campaigns
export async function fetchDonations(req: Request, res: Response) {
  try {
    const availableDonationCampaigns = await Donation.find({});

    if (!availableDonationCampaigns) {
      res.status(404).json({
        msg: "there isnt any running donation campaign at the moment",
      });
      return;
    } else {
      res.status(200).json({
        availableDonationCampaigns,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}

// fn for adding reviews
export async function addReviews(req: Request, res: Response) {
  try {
    const treasureId = req.params.treasureId;
    const reviewType = req.body.reviewType;
    const reviewComments = req.body.reviewComments;
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        msg: "token not found",
      });
      return;
    }

    const decoded = jwt.decode(token);
    const explorerEmail = (decoded as jwt.JwtPayload).userEmail;
    console.log(explorerEmail);

    const explorer = await Explorer.findOne({
      userEmail: explorerEmail,
    });

    const treasure = await Treasure.findOne({
      _id: treasureId,
    });

    const newReview = await Review.create({
      reviewType,
      reviewComments,
      author: explorer?._id,
      reviewOf: treasure?._id,
    });

    await Treasure.updateOne(
      {
        _id: treasureId,
      },
      {
        $push: {
          ratings: newReview,
        },
      }
    );

    res.status(200).json({
      msg: "review added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}
