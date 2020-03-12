import ConfigBuilder from "root/config/config-builder";

const mongoConfig: ConfigBuilder = () => {
  const URI_SCHEME = process.env["MONGODB_URI_SCHEME"] || "mongodb";
  const USER = process.env["MONGODB_USER"];
  const PASSWORD = process.env["MONGODB_PASSWORD"];
  const HOST = process.env["MONGODB_HOST"];
  const PORT = process.env["MONGODB_PORT"];
  const DATABASE = process.env["MONGODB_DATABASE"];

  let mongoUri = `${URI_SCHEME}://${HOST}:${PORT}/${DATABASE}?retryWrites=true&w=majority`;

  if (USER) {
    mongoUri = `${URI_SCHEME}://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}?retryWrites=true&w=majority`;
  }

  const URI = mongoUri;

  return {
    URI_SCHEME,
    USER,
    PASSWORD,
    HOST,
    PORT,
    DATABASE,
    URI,
  };
};

export default mongoConfig;
