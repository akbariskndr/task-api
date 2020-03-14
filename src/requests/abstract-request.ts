import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

interface AbstractPayloadConstructor {
  new (): AbstractPayload;
};

export abstract class AbstractPayload {
};

export interface AbstractRequestConstructor {
  new (obj: object): AbstractRequest;
}

export abstract class AbstractRequest {
  protected concreteObject: AbstractPayload;
  protected errors: Array<Record<string, string>>;

  constructor (protected obj: object, protected payloadType: AbstractPayloadConstructor) {
    this.setPayloadType(payloadType);
    this.setConcreteObject(obj);
  }

  setPayloadType (type: AbstractPayloadConstructor): void {
    this.payloadType = type;
  }

  setConcreteObject (payload: object): void {
    this.concreteObject = plainToClass(this.payloadType, payload);;
  }

  async isValid (): Promise<boolean> {
    const errors = await validate(this.concreteObject);
    this.errors = this.mapErrors(errors);

    return errors.length < 1;;
  }

  mapErrors (errors: ValidationError[]): Array<Record<string, string>> {
    return errors.map((error: ValidationError): Record<string, string> => {
      let message = error.toString().split("\n")[1].trim();
      message = message.substr(2, message.length);
      return {
        message
      };
    });
  }

  getErrors (): Array<Record<string, string>> {
    return this.errors;
  }

  getData (): AbstractPayload {
    return this.concreteObject;
  }
}
