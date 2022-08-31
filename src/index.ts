import * as core from "@actions/core";
import dockerDeployment from "./docker/main";
import gitDeployment from "./git/main";

(async function () {
  try {
    const HerokuApiKey = core.getInput("herokuApiKey");
    process.env.HEROKU_API_KEY = HerokuApiKey;
    const appName = core.getInput("herokuAppName");
    core.info(`Application Name: ${appName}`);
    const useDocker = core.getBooleanInput("useDocker");
    if (useDocker) {
      console.log("🐋 deployment with Docker 🐋");
      dockerDeployment(appName);
    } else {
      console.log("🐈 deployment with Git 🐈");
      gitDeployment(appName, HerokuApiKey);
    }
  } catch (error) {
    core.setFailed(error as string);
  }
})();
