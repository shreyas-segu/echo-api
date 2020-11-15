// eslint-disable-next-line @typescript-eslint/no-var-requires
const npsUtils = require("nps-utils");
import path from "path";

const buildDirectory = path.join(__dirname, "..", "build");

module.exports = {
  scripts: {
    default: "",
    build: "tsc",
    dev: "nodemon --inspect src/app.ts",
    start: "nodemon",
    clean: npsUtils.rimraf(buildDirectory, (err: Error) => {
      console.error(err.message);
    }),
    lint: "nps lintTs ",
    lintTs: "npm run lintEslint src/",
    lintEslint: "eslint --ignore-path .gitignore --ext .ts",
  },
};
