/**
 * Entry point of the application.
 * Connects to MongoDB and starts the server.
 */
import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

/**
 * Immediately invoked async function that calls the main function.
 */
(() => {
  main();
})();

/**
 * Main function that connects to MongoDB and starts the server.
 */
async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
