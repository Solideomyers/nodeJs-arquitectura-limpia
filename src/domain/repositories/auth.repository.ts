import { RegisterUserDto, LoginUserDto } from "..";
import { UserEntity } from "../entities/user.entity";

/**
 * Represents an abstract class for authentication repository.
 */
export abstract class AuthRepository {
  /**
   * Logs in a user with the provided login credentials.
   * @param loginUserDto - The login user data transfer object.
   * @returns A promise that resolves to the user entity.
   */
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  /**
   * Registers a new user with the provided registration data.
   * @param registerUserDto - The register user data transfer object.
   * @returns A promise that resolves to the user entity.
   */
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
