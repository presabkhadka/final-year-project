import { NextFunction, Request, Response } from "express";
import { Admin } from "../db/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;
  const word = token?.split(" ");

  if (word?.length !== 2 || word[0] !== "Bearer") {
    res.status(401).json({
      msg: "invalid token format",
    });
    return;
  }
  try {
    const cleanToken = word[1];
    const jwtPass = process.env.JWT_SECRET || "defaultkey";
    const decoded = jwt.verify(cleanToken, jwtPass);
    const adminEmail = (decoded as jwt.JwtPayload).email;
    const existingUser = await Admin.findOne({
      adminEmail,
    });
    if (!existingUser) {
      res.status(401).json({
        msg: "admin not found in db",
      });
      return;
    }
    req.user = adminEmail;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "admin not found in db",
    });
  }
}

export default adminMiddleware;
