import { RegisterUserDto, LoginUserDto } from "..";
import { UserEntity } from "../entities/user.entity";

/**
 * Represents a data source for authentication operations.
 */
export abstract class AuthDatasource {
  /**
   * Registers a new user.
   * @param registerUserDto - The user data for registration.
   * @returns A promise that resolves to the registered user data.
   */
  abstract register(registerUserDto: RegisterUserDto): Promise<RegisterUserDto>;

  /**
   * Logs in a user.
   * @param loginUserDto - The user data for login.
   * @returns A promise that resolves to the logged-in user entity.
   */
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
