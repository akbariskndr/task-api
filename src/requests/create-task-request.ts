import { IsISO8601, IsNotEmpty,IsOptional, IsString } from "class-validator";
import { AbstractRequest, AbstractPayload } from "./abstract-request";

class CreateTaskPayload implements AbstractPayload {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsOptional()
  @IsISO8601()
  dueAt?: Date;
};

export default class CreateTaskRequest extends AbstractRequest {
  constructor (protected obj: object) {
    super(obj, CreateTaskPayload);
  }
}
