import { Request, Response, NextFunction } from "express";
import jwt from "root/util/jwt";
import User from "root/models/user";

export default async (req: Request, res: Response, next: NextFunction) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token);
    const user = await User.findById(decoded);

    req.user = user;
  } catch (err) {
    return next(err);
  }
};
