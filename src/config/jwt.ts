import ConfigBuilder from "root/config/config-builder";

const jwtConfig: ConfigBuilder = () => {
  const EXPIRE = process.env.JWT_EXPIRE || "30m";

  return {
    EXPIRE
  };
};

export default jwtConfig;
