import { Request, Response, NextFunction } from "express";
import Task, { TaskProps } from "root/models/task";
import { TaskTransformer } from "root/transformers";
import { RestoreTaskPayload } from "root/requests/restore-task-request";

export default class TaskController {
  static async index (req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const tasks: TaskProps[] = await Task.find({ deletedAt: undefined });
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

  static async update (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const query = {
      user: 1,
      _id: req.params.id
    };

    const taskPayload = {
      ...req.payload,
    };

    const task: TaskProps = await Task.findOneAndUpdate(query, taskPayload, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json(TaskTransformer.transformSingle(task));
  }

  static async destroy (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const query = {
      _id: req.params.id,
      user: 1
    };

    await Task.findOneAndUpdate(query, {
      deletedAt: new Date(Date.now())
    });

    return res
      .sendStatus(204);
  }

  static async restore (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const payload = req.payload as RestoreTaskPayload;

    const query = {
      _id: {
        $in: payload.tasks
      },
      user: 1
    };

    const tasks: TaskProps = await Task.updateMany(query, { deletetAt: undefined });

    return res
      .status(200)
      .json(TaskTransformer.transformSingle(tasks));
  }
}
