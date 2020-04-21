import { IsISO8601, IsBoolean ,IsOptional, IsString } from "class-validator";
import { AbstractRequest, AbstractPayload } from "./abstract-request";

class UpdateTaskPayload implements AbstractPayload {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsISO8601()
  dueAt?: Date;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
};

export default class UpdateTaskRequest extends AbstractRequest {
  constructor (protected obj: object) {
    super(obj, UpdateTaskPayload);
  }
}
