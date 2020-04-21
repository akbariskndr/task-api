import { Request, Response, NextFunction } from "express";
import jwt from "root/util/jwt";
import User, { UserProps } from "root/models/user";

const isBearerTokenExist = (req: Request): boolean => {
  return req.headers.authorization && req.headers.authorization.startsWith("Bearer");
};

const fetchToken = (req: Request): string => {
  return req.headers.authorization.split(" ")[1];
};

const resolveUser = async (token: string): Promise<UserProps> => {
  const decoded = jwt.verify(token);
  return await User.findById(decoded);
};

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!isBearerTokenExist(req)) {
    return next();
  }

  const token = fetchToken(req);

  try {
    req.user = await resolveUser(token);
  } catch (err) {
    return next(err);
  }
};
