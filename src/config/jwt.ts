import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

/**
 * Adapter class for generating and validating JSON Web Tokens (JWT).
 */
export class JwtAdapter {
  /**
   * Generates a JWT with the provided payload and duration.
   * @param payload - The payload to be included in the JWT.
   * @param duration - The duration of the JWT validity. Defaults to "2h".
   * @returns A Promise that resolves to the generated JWT string or null if an error occurs.
   */
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  /**
   * Validates a JWT and returns the decoded payload.
   * @param token - The JWT to be validated.
   * @returns A Promise that resolves to the decoded payload or null if the token is invalid.
   */
  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
