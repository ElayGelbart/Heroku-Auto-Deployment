import * as core from "@actions/core";
import { execSync } from "child_process";
import { checkShallow, gitStack } from "./utils";

const gitDeploymentFn = (AppName: string, HerokuApiKey: string) => {
  try {
    execSync(`cat >~/.netrc <<EOF
    machine api.heroku.com
      login _
      password ${HerokuApiKey}
    machine git.heroku.com
      login _
      password ${HerokuApiKey}
      EOF`);
    const head = core.getInput("branch");
    const appDir = core.getInput("dir");
    execSync(`heroku git:remote -a ${AppName}`);
    core.info("✅ set git remote ✅");
    checkShallow();
    gitStack(AppName);
    if (appDir) {
      execSync(
        `git push heroku \`git subtree split --prefix ${appDir} ${head}\`:refs/heads/main --force`
      );
    } else {
      execSync(`git push heroku ${head}:refs/heads/main -f`);
    }
    core.info("🔥💥😀 pushed successfully to heroku 🔥💥😀");
  } catch (error) {
    core.setFailed(error as string);
    core.info(`🛑❌deployment failed❌🛑`);
    return;
  }
};

export default gitDeploymentFn;
