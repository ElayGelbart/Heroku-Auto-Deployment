import * as core from "@actions/core";
import dockerDeployment from "./docker/main";
import gitDeployment from "./git/main";

try {
  const appName = core.getInput("herokuAppName");
  const docker = core.getInput("useDocker") != null;
  core.info(`Application Name: ${appName}`);
  if (docker) {
    core.info("🐋 deployment with Docker 🐋");
    dockerDeployment(appName);
  } else {
    core.info("🐈 deployment with Git 🐈");
    const herokuApiKey = core.getInput("herokuApiKey");
    process.env.HEROKU_API_KEY = herokuApiKey;
    gitDeployment(appName, herokuApiKey);
  }
} catch (error: Error) {
  core.setFailed(error.message);
}
