import { Router } from "express";
import { AuthController } from "./controllers";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

/**
 * Represents the routes for authentication.
 */
export class AuthRoutes {
  /**
   * Gets the router with all the authentication routes defined.
   * @returns The router with the authentication routes.
   */
  static get routes(): Router {
    const router = Router();

    const databasesource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(databasesource);

    const controller = new AuthController(authRepository);

    // routes
    router.post("/login", controller.loginUSer);
    router.post("/register", controller.registerUSer);

    router.get("/", [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}
