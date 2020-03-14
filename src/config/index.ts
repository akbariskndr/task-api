import _ from "lodash";
import dotenv from "dotenv";
import mongoConfig from "./mongo";
import appConfig from "./app";
import jwtConfig from "./jwt";

dotenv.config({ path: ".env" });

export default (key: string) => {
  key = key.trim().toUpperCase();
  const map = {
    APP: appConfig(),
    MONGO: mongoConfig(),
    JWT: jwtConfig()
  };

  return _.get(map, key);
};
