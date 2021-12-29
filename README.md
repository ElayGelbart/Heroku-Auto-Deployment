# Heroku Auto Deployment

This GitHub action can help you automate your deployment to Heroku :rocket:.

With just 2 lines of code you can save a lot of time and focus on what matters.

Please read the Documentation before you start using the action.

## Vision

_Heroku Auto Deployment_ is not here to replace other actions in the market.
This action provides a better CI/CD experience for workflows with much less configurations and more capabilities.
_Heroku Auto Deployment_ wants you to config your app in Heroku dashboard, and use the action for only continuous deployment for heroku.  
Found a bug or missing feature? feel free to open a _issue_.

## Examples

### Git deployment

```yml
name: Publish To Heroku With Git
on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Dir
        uses: actions/checkout@v2
      - name: Heroku Deployment
        uses: ElayGelbart/Heroku-Auto-Deployment@v1.0.6
        with:
          herokuApiKey: ${{ secrets.HEROKU_API_KEY}}
          herokuAppName: ${{ secrets.HEROKU_APP_NAME}}
```

### Docker deployment

```yml
name: Publish To Heroku With Docker
on:
  push:
    branches: [main]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Dir
        uses: actions/checkout@v2
      - name: Heroku Deployment
        uses: ElayGelbart/Heroku-Auto-Deployment@v1.0.6
        with:
          herokuApiKey: ${{ secrets.HEROKU_API_KEY}}
          herokuAppName: ${{ secrets.HEROKU_APP_NAME}}
          useDocker: true
```

## Required steps

### Inputs

#### Required

The specialty of this action is that it only needs 2 Inputs to deploy (not 3 or more like the other actions on the marketplace)

**herokuApiKey** - Each account in Heroku has its own unique API Key, you can get your key by going to Heroku Account settings and reveal the key.
Another way is to login to heroku though the CLI and run `heroku auth:token`.
API key is personal so we don't want everyone to know it, **_Best practice_** is to save it in GitHub Secrets under the name _HEROKU_API_KEY_
herokuAppName

**herokuAppName** - Your application name you created in Heroku. Although it can be visible it's recommended to keep it in GitHub Secrets.

#### Optional

**useDocker** - if you wish to deploy to Heroku thorough Dockerfile, all you have to do is set this input to "true".

**branch** - you have the option to deploy with Git and choose a specific branch to deploy, just type the name of the branch. The default is the current branch.
_branch only capable for Git Deployment_

**dir** - Application directory in git repository for more complex repositories. The default is root dir. this works for both Dockerfile and Git Deployment.

Good:

```yml
dir: server
```

Bad:

```yml
dir: ./server
dir: /server
```

## Deployment with Git

When _useDocker_ input is not checked, the action deploys the git repository to the heroku main/master.  
Please Check that in the root dir, the file you need for the buildpack of heroku exists or alternatively give other directions to run your app.

## Deployment with Docker

When _useDocker_ input is true, the action deploys with Dockerfile in the root dir.  
Dockerfile **must** be named `Dockerfile` and not "DockerFile" or "dockerfile".

## Important Information

- Use _dir_ input with caution, it ignores all the repository files who are not included in _dir_.
- Before bringing your app deployment to action, define your build pack, env variable, etc.
- Always make sure you first deploy your app to Heroku manually to ensure it can run.
- Never share your Heroku APIKEY, it works like magic and can cause damage in the wrong hands.

See the [Heroku Deployment](https://devcenter.heroku.com/categories/deployment) for more info about deployment! :rocket:
