import { UserProps } from "root/models/user";
import { AbstractPayload } from "root/requests/abstract-request";

declare module "express" {
  export interface Request {
    user?: UserProps;
    payload?: AbstractPayload;
  }
}