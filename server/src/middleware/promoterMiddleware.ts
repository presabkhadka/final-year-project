import { Response, Request, NextFunction } from "express";
import { Promoter } from "../db/db";

export async function promoterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.headers.username;
  const password = req.headers.password;
  const existingUser = await Promoter.findOne({
    userName: username,
    userPassword: password,
  });
  if (!existingUser) {
    return res.status(401).json({
      msg: "promoter not found in db",
    });
  }

  next();
}

export default promoterMiddleware;
