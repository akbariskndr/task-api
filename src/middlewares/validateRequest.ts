import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { AbstractRequestConstructor } from "root/requests/abstract-request";

const validateRequest = (requestType: AbstractRequestConstructor) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const requestPayload = req.body || req.params;
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

export default validateRequest;
