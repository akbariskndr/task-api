import { Request, Response, NextFunction } from "express";
import Task, { TaskProps } from "root/models/task";
import { TaskTransformer } from "root/transformers";

export default class TaskController {
  static async index (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const tasks: TaskProps[] = await Task.find({});
      return res
        .status(200)
        .json(TaskTransformer.transform(tasks));
    } catch (err) {
      next(err);
    }
  }

  static async store (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const taskPayload = {
      ...req.payload,
      completed: false,
      user: 1,
    };

    const task: TaskProps = await Task.create(taskPayload);

    return res
      .status(200)
      .json(TaskTransformer.transformSingle(task));
  }
}
