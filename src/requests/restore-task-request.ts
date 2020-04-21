import { IsArray } from "class-validator";
import { AbstractRequest, AbstractPayload } from "./abstract-request";

export class RestoreTaskPayload implements AbstractPayload {
  @IsArray()
  tasks: Array<number>;
};

export default class RestoreTaskRequest extends AbstractRequest {
  constructor (protected obj: object) {
    super(obj, RestoreTaskPayload);
  }
}
