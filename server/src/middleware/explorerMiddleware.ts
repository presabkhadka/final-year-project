import { NextFunction, Request, Response } from "express";
import { Explorer } from "../db/db";

async function explorerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.headers.username;
  const password = req.headers.password;
  const existingUser = await Explorer.findOne({
    userName: username,
    userPassword: password,
  });

  if (!existingUser) {
    return res.status(401).json({
      msg: "explorer not found in db",
    });
  }
  next();
}

export default explorerMiddleware;
