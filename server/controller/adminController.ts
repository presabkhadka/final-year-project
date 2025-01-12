import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/adminMiddleware";
import bcrypt from "bcrypt";
import { Admin } from "../db/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = Router();

dotenv.config();

interface payload {
  email: string;
}

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

      Admin.create({
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

export async function admingLogin(req: Request, res: Response) {
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
    } else {
      let payload: payload = { email };
      const jwtPass: string = process.env.JWT_SECRET || "defaultSecretKey";
      console.log(payload);
      let token = jwt.sign(payload, jwtPass);
      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something wrong with the server",
    });
  }
}
