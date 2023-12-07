import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

/**
 * Represents the routes of the application.
 */
export class AppRoutes {
  /**
   * Gets the routes of the application.
   * @returns {Router} The router object containing the routes.
   */
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
