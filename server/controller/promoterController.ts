import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Promoter, Treasure } from "../db/db";

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

export async function addTreasure(req: Request, res: Response) {
  try {
    const treasureName = req.body.treasureName;
    const treasureLocation = req.body.treasureLocation;
    const treasureDescription = req.body.treasureDescription;
    const treasureType = req.body.treasureType;
    const treasureImage = req.file?.path;

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
      });
      res.status(200).json({
        msg: "treasure created successfully",
        newTreasure,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "something wrong with the server at the moment",
    });
  }
}
