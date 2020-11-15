import { Router, Request, Response } from "express";
import cluster from "cluster";

const route = Router();

export default (app: Router): void => {
  app.use("/", route);

  route.get("/thread", (req: Request, res: Response) => {
    console.log(cluster.worker.id);
    return res
      .json({ id: cluster.worker.id, isMaster: cluster.isMaster })
      .status(200);
  });
};
