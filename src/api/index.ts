import { Router } from "express";
import hello from "./routes/thread-info";

export default (): Router => {
  const app = Router();
  hello(app);
  return app;
};
