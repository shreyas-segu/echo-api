import expressLoader from "./express";
import { Application } from "express";
import Logger from "./logger";
import "./events";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (expressApp: Application) => {
  Logger.info("Starting loaders");

  expressLoader(expressApp);
  Logger.info("Express loaded");
};
