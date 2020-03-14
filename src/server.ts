import "module-alias/register";

import express from "express";
import mongoose from "mongoose";
import config from "root/config";
import connect from "root/database/connect";
import morgan from "morgan";
import taskRouter from "root/routes/task";

const app = express();

connect(mongoose, config("mongo.uri"));

app.use(express.json());

if (config("app.env") !== "prod") {
  app.use(morgan("dev"));
}

app.use("/task", taskRouter);

app.listen(config("app.port"), () => {
  console.log(`App is running on http://localhost:${config("app.port")}`);
});
