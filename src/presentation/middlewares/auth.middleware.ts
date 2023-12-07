/**
 * Middleware for validating JWT token.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: "Error invalid token" });

      req.body.user = user;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }

    next();
  };
}
