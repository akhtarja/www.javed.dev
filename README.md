# www.javed.dev

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=akhtarja_www.javed.dev&metric=alert_status)](https://sonarcloud.io/dashboard?id=akhtarja_www.javed.dev)
[![Test status](https://github.com/akhtarja/www.javed.dev/workflows/test/badge.svg)](https://github.com/akhtarja/www.javed.dev/actions)
[![Deploy status](https://github.com/akhtarja/www.javed.dev/workflows/deploy/badge.svg)](https://github.com/akhtarja/www.javed.dev/actions)

This repository contains the codebase for https://www.javed.dev.

The Gulp build process places the final assets into the /build folder. The serverless deployment process creates an S3 bucket called `www.javed.dev` to hold the assets. This can be changed by editing the value of `APP_BUCKET_NAME` in `app/serverless.yml`.

## Building the Front End

Build the application front end. Go back to the project's root and do the following for a **development environment**:

```
cd app
npm ci
npm run start
```

This will run the application in a local development server at `localhost:3000`. To create an optimized production build, run `npm run build`. The compiled assets will be created in the `build` folder.

This site uses the Bootstrap New Age theme located at https://github.com/BlackrockDigital/startbootstrap-new-age
