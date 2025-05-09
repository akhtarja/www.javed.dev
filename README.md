# www.javed.dev

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

## Deploying

Deploy the application with `npm run deploy`. This will deploy the optimized production build to the correct AWS S3 bucket.

The website is served from the Cloudfront distribution. The cache has a TTL, which will expire on its own after enough time. To expedite this, set the `WWW_JAVED_DEV_CLOUDFRONT_ID` environment variable and run `npm run invalidate`.
