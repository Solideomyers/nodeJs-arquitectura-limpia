import { Validators } from "../../../config";

/**
 * Data transfer object for registering a user.
 */
export class RegisterUserDto {
  /**
   * Creates a new instance of RegisterUserDto.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password of the user.
   */
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  /**
   * Creates a new instance of RegisterUserDto from an object.
   * @param object - The object containing the user data.
   * @returns An array containing an error message (if any) and the created RegisterUserDto instance.
   */
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;
    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.length < 6) return ["Password is too short"];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
