import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user-dto";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/auth.repository";

/**
 * Represents the token generated for a user upon successful login.
 */
interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Represents a function that signs a token with a payload and an optional duration.
 */
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

/**
 * Represents the use case for logging in a user.
 */
interface LoginUserUseCase {
  /**
   * Executes the login user use case.
   * @param loginUserDto - The DTO containing the login user data.
   * @returns A promise that resolves to the user token upon successful login.
   * @throws {CustomError} If there is an error generating the token.
   */
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

/**
 * Represents the implementation of the login user use case.
 */
export class LoginUser implements LoginUserUseCase {
  /**
   * Creates an instance of the LoginUser class.
   * @param authRepository - The repository for authentication operations.
   * @param signToken - The function used to sign the token. Defaults to JwtAdapter.generateToken.
   */
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  /**
   * Executes the login user use case.
   * @param loginUserDto - The DTO containing the login user data.
   * @returns A promise that resolves to the user token upon successful login.
   * @throws {CustomError} If there is an error generating the token.
   */
  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // Crear usuario
    const user = await this.authRepository.login(loginUserDto);
    // token
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
