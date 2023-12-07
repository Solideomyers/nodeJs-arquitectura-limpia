/**
 * Represents a user entity.
 */
export class UserEntity {
  /**
   * Creates a new instance of the UserEntity class.
   * @param id - The unique identifier of the user.
   * @param name - The name of the user.
   * @param email - The email address of the user.
   * @param password - The password of the user.
   * @param role - The roles assigned to the user.
   * @param img - The image URL of the user (optional).
   */
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string
  ) {}
}
