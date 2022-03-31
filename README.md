# www.javed.dev

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=akhtarja_www.javed.dev&metric=alert_status)](https://sonarcloud.io/dashboard?id=akhtarja_www.javed.dev)
[![Test status](https://github.com/akhtarja/www.javed.dev/workflows/test/badge.svg)](https://github.com/akhtarja/www.javed.dev/actions)
[![Deploy status](https://github.com/akhtarja/www.javed.dev/workflows/deploy/badge.svg)](https://github.com/akhtarja/www.javed.dev/actions)

This repository contains the codebase for https://www.javed.dev.

The Gulp build process places the final assets into the /build folder. The serverless deployment process creates an S3 bucket called `www.javed.dev` to hold the assets. This can be changed by editing the value of `APP_BUCKET_NAME` in `app/serverless.yml`.

## Serverless Framework Dashboard setup

### Creating the app

1. Log into the Serverless Framework Dashboard at https://dashboard.serverless.com and create an app called `www-javed-dev`. If you need to create a new org to do this, create one now and name it anything you like.
2. If this is your first time using the Serverless Framework Dashboard, run the following command and follow the prompts to complete the initial setup of the command line tool:

```
serverless login
```

Note: Serverless Dashboard documentation is available at: https://serverless.com/framework/docs/dashboard/

### Profile setup

The project uses the safeguard policies outlined below. Failure to configure these policies will not prevent you from deploying the app's services, but you will receive warnings when deploying to your dev environment. These safeguards can be configured with profile names for each stage (`dev`, `staging`, `prod`), or under the `default` profile, which will be used as a fallback in case stage-specific profiles don't exist.

| Policy                        | Safeguard config                   | Enforcement level                                        |
| ----------------------------- | ---------------------------------- | -------------------------------------------------------- |
| `allowed-stages`              | `- dev`<br>`- staging`<br>`- prod` | warning: allow the deploy to continue, but warn the user |
| `framework-version`           | `>=1.39.1 <2.0.0`                  | warning: allow the deploy to continue, but warn the user |
| `runtimes`                    | `nodejs10.x`                       | error: block the deploy from continuing                  |
| `no-secret-env-vars`          |                                    | error: block the deploy from continuing                  |
| `allowed-regions`             | `- us-east-1`                      | error: block the deploy from continuing                  |
| `no-wild-iam-role-statements` |                                    | warning: allow the deploy to continue, but warn the user |

## Deploying the Back End

1. Clone this repo.

2. Create an AWS IAM user with programmatic access. Add the keys to your local AWS credential files using the name `www-javed-dev`.

3. The application expects the following environment variables:

| Variable name                             | Description                                                                                                                                                |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `WWW_JAVED_DEV_SPOTIFY_NOW_PLAYING_URL`   | The URL of the Spotify Now Playing API endpoint                                                                                                            |
| `WWW_JAVED_DEV_SPOTIFY_NOW_PLAYING_KEY`   | The API key for use with the Spotify Now Playing endpoint                                                                                                  |
| `WWW_JAVED_DEV_NOWPLAYING_API_CUSTOM_URL` | The absolute root URL of a custom now playing endpoint URL, if desired. If this is left blank, the API endpoint URL will be automatically generated by AWS |

4. Deploy the `now-playing` service. From the project's root:

```
cd now-playing
```

The next command can be skipped if you are not deploying from a freshly cloned instance of the project:

```
serverless --org [your serverless org name] --app www-javed-dev
```

To install the dependencies and deploy the service to AWS:

```
npm ci
serverless deploy [--stage dev|staging|prod]
```

## Building the Front End

Build the application front end. Go back to the project's root and do the following for a **development environment**:

```
cd app
npm ci
npm run start
```

This will run the application in a local development server at `localhost:3000`. To create an optimized production build, run `npm run build`. The compiled assets will be created in the `build` folder.

This site uses the Bootstrap New Age theme located at https://github.com/BlackrockDigital/startbootstrap-new-age
