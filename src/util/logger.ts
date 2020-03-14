import winston from "winston";
import config from "root/config";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: config("app.env") === "prod" ? "error" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
  ]
};

const logger = winston.createLogger(options);

export default logger;
