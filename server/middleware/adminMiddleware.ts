import { NextFunction, Request, Response } from "express";
import { Admin } from "../db/db";

async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.headers.username;
  const password = req.headers.password;
  const existingUser = await Admin.findOne({
    adminName: username,
    adminPassword: password,
  });
  if (!existingUser) {
    return res.status(401).json({
      msg: "admin not found in db",
    });
  }
  next();
}

export default adminMiddleware;
