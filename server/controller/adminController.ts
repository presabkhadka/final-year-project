import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import { Admin } from "../db/db";
import jwt from "jsonwebtoken";
const jwtPass = "secure";
const router = Router();

export async function adminSignup(req: Request, res: Response): Promise<void> {
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
    Admin.create({
      adminName,
      adminEmail,
      adminPassword,
      adminContact,
    });
    console.log("hehehe");
    
    res.status(200).json({
      msg: "admin created successfully",
    });
  }
}

export async function admingLogin(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await Admin.findOne({
    adminEmail: email,
    adminPassword: password,
  });
  if (!existingUser) {
    res.status(401).json({
      msg: "admin not found",
    });
  } else {
    let payload = {email, password};
    console.log(payload);
    let token = jwt.sign(payload, jwtPass);
    res.status(200).json({
      token,
    });
  }
}
