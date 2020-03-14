import jwt from "jsonwebtoken";
import config from "root/config";

export const sign = (idPayload: Record<string, number>): string => {
  return jwt.sign(idPayload, config("app.key"), {
    expiresIn: config("jwt.expire"),
  });
};

export const verify = (token: string): string | object => {
  return jwt.verify(token, config("app.key"));
};

export default {
  sign,
  verify
};
