import { compareSync, hashSync } from "bcryptjs";

/**
 * BcryptAdapter class provides methods for hashing and comparing passwords using bcrypt.
 */
export class BcryptAdapter {
  /**
   * Hashes the given password using bcrypt.
   * @param password - The password to be hashed.
   * @returns The hashed password.
   */
  static hash(password: string): string {
    return hashSync(password);
  }

  /**
   * Compares the given password with the hashed password using bcrypt.
   * @param password - The password to be compared.
   * @param hashed - The hashed password to compare against.
   * @returns True if the password matches the hashed password, false otherwise.
   */
  static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}
