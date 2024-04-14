import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { Server } from "http";
import { connectToDb } from "../database/mongoConnections";
import router from "../api/router/verificationRouter";
import dotenv from "dotenv";
dotenv.config();

export class AppServer {
  private readonly express: express.Express;
  private readonly port: string;
  private readonly server;

  constructor(port: string, httpServer: Server) {
    this.port = port;
    this.express = express();
    this.express.use(helmet());
    this.express.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
      })
    );
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.server = httpServer;
    this.express.use(router);
  }

  async listen(): Promise<void> {
    await new Promise<void>((resolve) => {
      connectToDb((error: Error) => {
        !error &&
          this.express.listen(this.port, async () => {
            try {
              await this.server.listen(4040);
            } catch (error) {
              return error;
            }

            // eslint-disable-next-line no-console
            console.log(
              `Backend App is running at http://localhost:${
                this.port
              } in ${this.express.get("env")} mode`
            );
            console.log(`Socket running at port http://localhost:4040`);
            console.log(`Database connected`);
            // eslint-disable-next-line no-console
            resolve();
          });
      });
    });
  }
}
