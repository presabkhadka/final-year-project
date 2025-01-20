import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { Explorer } from "../db/db";
import jwt from "jsonwebtoken";
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
