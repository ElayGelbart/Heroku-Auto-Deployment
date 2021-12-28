import core from "@actions/core";
import dockerDeployment from "./docker/main";
import gitDeployment from "./git/main";

try {
  (async function () {
    const HerokuApiKey = core.getInput("herokuApiKey");
    process.env.HEROKU_API_KEY = HerokuApiKey;
    const AppName = core.getInput("herokuAppName");
    console.log(`Application Name: ${AppName}`);
    if (core.getInput("useDocker")) {
      console.log("🐋 deployment with Docker 🐋");
      dockerDeployment(AppName);
    } else {
      console.log("🐈 deployment with Git 🐈");
      gitDeployment(AppName, HerokuApiKey);
    }
  })();
} catch (error) {
  core.setFailed(error as string);
}
