import { NextFunction, Request, Response } from "express";
import { Explorer } from "../db/db";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

async function explorerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      msg: "No token present in the headers",
    });
    return;
  }

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
    const explorerEmail = (decoded as jwt.JwtPayload).userEmail;
    const existingUser = await Explorer.findOne({});
    if (!existingUser) {
      res.status(401).json({
        msg: "explorer not found in db",
      });
      return;
    }
    req.user = explorerEmail;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "explorer not found in db",
    });
  }
}

export default explorerMiddleware;
