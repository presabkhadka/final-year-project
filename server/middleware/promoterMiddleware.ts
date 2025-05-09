import { NextFunction, Request, Response } from "express";
import { Promoter } from "../db/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function promoterMiddleware(
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
    const jwtPass = process.env.JWT_SECRET || "defaultKey";
    const decoded = jwt.verify(cleanToken, jwtPass);
    const promoterEmail = (decoded as jwt.JwtPayload).userEmail;

    const existingUser = Promoter.findOne({});
    if (!existingUser) {
      res.status(401).json({
        msg: "promoter not found in db",
      });
      console.log("🚀 ~ promoterEmail:", promoterEmail)
      return;
    }

    req.user = promoterEmail;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "promoter not found in db",
    });
  }
}

export default promoterMiddleware;
