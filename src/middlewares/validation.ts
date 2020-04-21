import { Request, Response, NextFunction } from "express";
import { AbstractRequestConstructor } from "root/requests/abstract-request";

export const validateRequest = (requestType: AbstractRequestConstructor) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestPayload = req.body;
    const payload = new requestType(requestPayload);

    if (!await payload.isValid()) {
      return res
        .status(400)
        .json(payload.getErrors());
    }

    req.payload = payload.getData();
    next();
  };
};
