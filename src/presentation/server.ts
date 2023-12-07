import express, { Router } from "express";

/**
 * Options for configuring the server.
 */
interface Options {
  /**
   * The port number on which the server should listen. Default is 3100.
   */
  port?: number;
  /**
   * The router containing the routes for the server.
   */
  routes: Router;
}

/**
 * Represents a server that listens for incoming requests and handles them using the specified routes.
 */
export class Server {
  /**
   * The Express application instance.
   */
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  /**
   * Creates a new instance of the Server class.
   * @param options - The options for configuring the server.
   */
  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  /**
   * Starts the server and begins listening for incoming requests.
   */
  async start() {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //x-www-encoded-form

    // routes (controllers)
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
