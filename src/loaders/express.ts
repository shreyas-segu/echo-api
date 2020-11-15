import { Request, Response, Application } from "express";
import routes from "../api";
import config from "../config";
import bodyParser from "body-parser";

export default (app: Application): void => {
  // Basic Healthcheck endpoints
  app.get("/status", (req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.enable("trust proxy");

  // Middleware which converts plaintext into json
  app.use(bodyParser.json());

  // load routes with prefix
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((req, res) => {
    const err = new Error("Not Found");
    res.status(404);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  app.use((err: Error, req: Request, res: Response) => {
    res.status(500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
