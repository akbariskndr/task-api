import ConfigBuilder from "root/config/config-builder";

const appConfig: ConfigBuilder = () => {
  const ENV = process.env.NODE_ENV || "local";
  const DEBUG = process.env.APP_DEBUG || false;
  const PORT = process.env.APP_PORT || 9000;
  const KEY = process.env.APP_KEY || "";

  return {
    ENV,
    DEBUG,
    PORT,
    KEY
  };
};

export default appConfig;
