import { Router, type Request, type Response } from "express";
import { Explorer } from "../db/db";
import jwt from "jsonwebtoken";
const jwtPass = "secure";

export async function explorerSignup(
  req: Request,
  res: Response
): Promise<void> {
  const userName = req.body.username;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userContact = req.body.contact;
  const userType = req.body.type;
  const existingUser = await Explorer.findOne({
    userEmail,
  });
  if (existingUser) {
    res.status(409).json({
      msg: "explorer already excists with this email",
    });
  } else {
    Explorer.create({
      userName,
      userEmail,
      userPassword,
      userContact,
      userType,
    });
    res.status(200).json({
      msg: "explorer created successfully",
    });
  }
}

export async function explorerLogin(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await Explorer.findOne({
    userEmail: email,
    userPassword: password,
  });
  if (!existingUser) {
    res.status(401).json({
      msg: "explorer not found",
    });
  } else {
    let token = jwt.sign(email, jwtPass);
    res.status(200).json({
      token,
    });
  }
}
