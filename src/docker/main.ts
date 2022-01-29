import * as core from "@actions/core";
import { execSync } from "child_process";

const dockerDeploymentFn = (AppName: string) => {
  try {
    execSync("heroku container:login");
    core.info("✅ logged the container ✅");
    const appDir = core.getInput("dir");
    execSync(
      `heroku container:push web -a ${AppName}`,
      appDir ? { cwd: appDir } : {}
    );
    core.info("✅✅ pushed container successfully ✅✅");
    execSync(
      `heroku container:release web -a ${AppName}`,
      appDir ? { cwd: appDir } : {}
    );
    core.info("💥🐋🐋🐋💥 App Released To Heroku! 💥🐋🐋🐋💥 ");
  } catch (error) {
    core.setFailed(error as string);
    core.info(`🛑❌deployment failed❌🛑`);
    return;
  }
};

export default dockerDeploymentFn;
