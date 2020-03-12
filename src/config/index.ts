import _ from "lodash";
import dotenv from "dotenv";
import mongoConfig from "root/config/mongo";
import appConfig from "./app";

dotenv.config({ path: ".env" });

export default (key: string) => {
  key = key.trim().toUpperCase();
  const map = {
    APP: appConfig(),
    MONGODB: mongoConfig()
  };

  return _.get(map, key);
};
