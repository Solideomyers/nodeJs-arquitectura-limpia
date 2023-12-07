/**
 * Configuration file for environment variables.
 */

import "dotenv/config";
import { get } from "env-var";

/**
 * Object containing the environment variables.
 */
export const envs = {
  /**
   * The port number for the server.
   */
  PORT: get("PORT").required().asPortNumber(),

  /**
   * The URL for the MongoDB connection.
   */
  MONGO_URL: get("MONGO_URL").required().asString(),

  /**
   * The name of the MongoDB database.
   */
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),

  /**
   * The seed used for JWT token generation.
   */
  JWT_SEED: get("JWT_SEED").required().asString(),
};
