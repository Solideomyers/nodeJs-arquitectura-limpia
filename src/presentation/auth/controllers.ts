import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUserDto,
  RegisterUser,
  LoginUserDto,
  LoginUser,
} from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

/**
 * Controller class for handling authentication-related requests.
 */
export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Handles the registration of a new user.
   * @param req - The request object.
   * @param res - The response object.
   */
  registerUSer = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  /**
   * Handles the login of a user.
   * @param req - The request object.
   * @param res - The response object.
   */
  loginUSer = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  /**
   * Retrieves all users.
   * @param req - The request object.
   * @param res - The response object.
   */
  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => {
        res.json({
          users,
          token: req.body.user,
        });
      })
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };

  /**
   * Handles error responses.
   * @param error - The error object.
   * @param res - The response object.
   */
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };
}
