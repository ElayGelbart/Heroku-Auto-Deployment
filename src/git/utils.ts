import { execSync } from "child_process";
export const checkShallow = (): void => {
  const isShallow = execSync(
    "git rev-parse --is-shallow-repository"
  ).toString();

  if (isShallow.match(/true/)) {
    execSync("git fetch --prune --unshallow");
    console.log("git unshallow repository🔄");
  }
};
export const gitStack = (AppName: string): void => {
  execSync("heroku stack:set heroku-22");
  execSync("heroku plugins:install heroku-repo");
  execSync(`heroku repo:reset -a ${AppName}`);
};
