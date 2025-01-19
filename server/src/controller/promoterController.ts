import { Router, type Request, type Response } from "express";
import { Promoter } from "../db/db";
import jwt from "jsonwebtoken";
const jwtPass = "secure";

export async function promoterSignup(
  req: Request,
  res: Response
): Promise<void> {
  const userName = req.body.username;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userContact = req.body.contact;
  const userType = req.body.type;
  const isVerified = req.body.verification;
  const existingUser = await Promoter.findOne({
    userEmail,
  });
  if (existingUser) {
    res.status(409).json({
      msg: "explorer already excists with this email",
    });
  } else {
    Promoter.create({
      userName,
      userEmail,
      userPassword,
      userContact,
      userType,
      isVerified,
    });
    res.status(200).json({
      msg: "promoter created successfully",
    });
  }
}

export async function promoterLogin(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await Promoter.findOne({
    userEmail: email,
    userPassword: password,
  });
  if (!existingUser) {
    res.status(401).json({
      msg: "promoter not found",
    });
  } else {
    let token = jwt.sign(email, jwtPass);
    res.status(200).json({
      token,
    });
  }
}
