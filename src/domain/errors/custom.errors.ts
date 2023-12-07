/**
 * Represents a custom error with a specific status code and message.
 */
export class CustomError extends Error {
  /**
   * Creates a new instance of CustomError.
   * @param statusCode The HTTP status code associated with the error.
   * @param message The error message.
   */
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  /**
   * Creates a new instance of CustomError with a 400 Bad Request status code.
   * @param message The error message.
   * @returns A new instance of CustomError.
   */
  static badRequest(message: string) {
    return new CustomError(400, message);
  }

  /**
   * Creates a new instance of CustomError with a 401 Unauthorized status code.
   * @param message The error message.
   * @returns A new instance of CustomError.
   */
  static unauthorized(message: string) {
    return new CustomError(401, message);
  }

  /**
   * Creates a new instance of CustomError with a 403 Forbidden status code.
   * @param message The error message.
   * @returns A new instance of CustomError.
   */
  static forbidden(message: string) {
    return new CustomError(403, message);
  }

  /**
   * Creates a new instance of CustomError with a 404 Not Found status code.
   * @param message The error message.
   * @returns A new instance of CustomError.
   */
  static notFound(message: string) {
    return new CustomError(404, message);
  }

  /**
   * Creates a new instance of CustomError with a 500 Internal Server Error status code.
   * @param message The error message. Defaults to "Internal Server".
   * @returns A new instance of CustomError.
   */
  static internalServer(message: string = "Internal Server") {
    return new CustomError(500, message);
  }
}
