import "module-alias/register";

import express, { Request, Response, Router } from "express";
import mongoose from "mongoose";
import config from "root/config";
import connect from "root/database/connect";
import Task from "root/models/task";

const app = express();

connect(mongoose, config("mongo.uri"));

const router = Router();

router.get("/tasks", async (req: Request, res: Response): Promise<Response> => {
  const tasks = await Task.find({});
  return res
    .status(200)
    .json({
      success: true,
      data: tasks
    });
});

router.get("/", (req: Request, res: Response): Response => {
  return res.sendStatus(204);
});

app.use("/", router);

app.listen(config("app.port"), () => {
  console.log(`App is running on http://localhost:${config("app.port")}`);
});
