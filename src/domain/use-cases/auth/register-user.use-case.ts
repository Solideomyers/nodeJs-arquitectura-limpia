import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.errors";
import { AuthRepository } from "../../repositories/auth.repository";

/**
 * Represents the token generated for a registered user.
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
 * Represents the use case for registering a user.
 */
interface RegisterUserUseCase {
  /**
   * Executes the use case to register a user.
   * @param registerUserDto - The data required to register a user.
   * @returns A promise that resolves to the generated user token.
   * @throws {CustomError} If there is an error generating the token.
   */
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

/**
 * Represents the implementation of the RegisterUserUseCase interface.
 */
export class RegisterUser implements RegisterUserUseCase {
  /**
   * Creates an instance of RegisterUser.
   * @param authRepository - The repository for authentication operations.
   * @param signToken - The function used to sign the token. Defaults to JwtAdapter.generateToken.
   */
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  /**
   * Executes the use case to register a user.
   * @param registerUserDto - The data required to register a user.
   * @returns A promise that resolves to the generated user token.
   * @throws {CustomError} If there is an error generating the token.
   */
  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // Crear usuario
    const user = await this.authRepository.register(registerUserDto);
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
