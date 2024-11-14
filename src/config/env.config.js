import { configDotenv } from "dotenv";
import { cleanEnv, num, port, str } from "envalid";

configDotenv({
  path: "./.env",
});

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  PORT: port({ default: 3333 }),

  DB_URI: str({ default: "mongodb://localhost:27017" }),
  DB_NAME: str({ default: "user" }),

  REDIS_HOST: str({ default: "localhost" }),
  REDIS_PORT: num({ default: 6379 }),
  REDIS_PASSWORD: str({ default: "" }),
  REDIS_DB: num({ default: 0 }),

  KAFKA_CLIENT_ID: str({ default: "user-service" }),
  KAFKA_BROKERS_URI: str({ default: "localhost:9092" }),
});

export default env;
