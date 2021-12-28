# Heroku Auto Deployment

This GitHub action can help you automate your deployment to Heroku :rocket:

With just 2 lines of code you can save a lot of time and focus on whats matter.

Please read the Documentation till the end before you start using the action.

## Vision

_Heroku Auto Deployment_ not here to replace other action in the market.
This action provides a better CI/CD experience for workflows with much less configurations and more capabilities.
_Heroku Auto Deployment_ wants you to config your app in Heroku dashboard, and use the action for only continuous deployment for heroku.
Found a bug or missing feature? fell free to open a _issue_.

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
        uses: ElayGelbart/Heroku-Auto-Deployment@v1
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
        uses: ElayGelbart/Heroku-Auto-Deployment@v1
        with:
          herokuApiKey: ${{ secrets.HEROKU_API_KEY}}
          herokuAppName: ${{ secrets.HEROKU_APP_NAME}}
          useDocker: true
```

## Required steps

### Inputs

#### Required

the specialty of this action is it only need 2 Inputs to deploy(not 3 like the rest)

**herokuApiKey** - Each account in Heroku has his own unique API Key, you can get your key by going to Heroku Account settings and reveal the key.
other way is to login to heroku though CLI and run `heroku auth:token`.
API key is personal so we don't want everyone to know it, **_Best practice_** is to save it in GitHub Secrets under the name _HEROKU_API_KEY_
herokuAppName

**herokuAppName** - Your application name you created in Heroku. although it can be visible it recommended to keep it in GitHub Secrets.

#### Optional

**useDocker** - if you wish to deploy to Heroku thorough Dockerfile, all you have to do is set this input to "true".

**branch** - you have the option to deploy with Git and choose other branch, just type the name of it. The default is the current branch.
_branch only capable for Git Deployment_

**dir** - Application directory in git repository for more complex repositories. The default is root dir. this work both for Dockerfile and for Git Deployment.
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

when _useDocker_ input not checked, the action deploy push the git repository to the heroku main/master. Please Check that in the root dir the file you need for
the buildpack of heroku exists or give some other directions to run your app.

## Deployment with Docker

when _useDocker_ input is true, the action deploy with Dockerfile in the root dir. Dockerfile must be name "Dockerfile" and not "DockerFile" or "dockerfile".

## Important Information

[-] use _dir_ input with caution, It's ignore all the repository files who is not included in _dir_.
[-] before bringing your app deployment to action, define your build pack and env variable and etc.
[-] always make sure you deploy your app yourself for the first time to ensure it can run.
[-] never share your Heroku APIKEY, it's work like magic and can damage in the wrong hands.

See the [Heroku Deployment](https://devcenter.heroku.com/categories/deployment) for more info about deployment! :rocket:
