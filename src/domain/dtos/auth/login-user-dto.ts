import { Validators } from "../../../config";

/**
 * Represents a data transfer object for logging in a user.
 */
export class LoginUserDto {
  /**
   * Creates a new instance of the LoginUserDto class.
   * @param email - The email of the user.
   * @param password - The password of the user.
   */
  constructor(public email: string, public password: string) {}

  /**
   * Creates a LoginUserDto instance from a plain object.
   * @param object - The plain object containing the email and password.
   * @returns An array with an optional error message and a LoginUserDto instance.
   */
  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password is too short"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
