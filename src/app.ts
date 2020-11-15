import config from "./config";
import express from "express";
import Logger from "./loaders/logger";
import loaders from "./loaders";

// Cluster mode
import cluster from "cluster";
import os from "os";

async function startServer() {
  const app = express();
  loaders(app);

  app
    .listen(config.port, () => {
      Logger.info(`Server listening on port ${config.port}`);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

// Check if current process is master.
if (cluster.isMaster) {
  // Get total CPU cores.
  const cpuCount = os.cpus().length - 1;
  // Spawn a worker for every core.
  for (let j = 0; j < cpuCount; j++) {
    cluster.fork();
  }
  Logger.info(`Master process found and forking ${cpuCount} threads`);
} else {
  // This is not the master process, so we spawn the express server.
  startServer();
}

// Cluster API has a variety of events.
// Here we are creating a new process if a worker die.
cluster.on("exit", function (worker) {
  console.log(`Worker ${worker.id} died'`);
  console.log(`Staring a new one...`);
  cluster.fork();
});
