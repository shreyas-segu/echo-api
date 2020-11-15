import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFile = dotenv.config();

if (envFile.error) {
  throw new Error("Couldn't find a .env file");
}

export default {
  port: parseInt(process.env.PORT!, 10),
  logs: {
    level: process.env.LOG_LEVEL || "debug",
  },
  api: {
    prefix: "/api",
  },
};
