import { Request, Response, NextFunction } from "express";
import User, { UserProps } from "root/models/user";
import UserService from "root/domains/user/user-service";

export default class AuthController {
  static register (req: Request, res: Response, _: NextFunction): Response {
    return res.sendStatus(204);
  }

  static login (req: Request, res: Response, _: NextFunction): Response {
    return res.sendStatus(204);
  }

  static forgotPassword (req: Request, res: Response, _: NextFunction): Response {
    return res.sendStatus(204);
  }

  static resetPassword (req: Request, res: Response, _: NextFunction): Response {
    return res.sendStatus(204);
  }
}
