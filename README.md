# www.javed.dev

This repository contains the codebase for https://www.javed.dev.

The Gulp build process places the final assets into the /build folder. The serverless deployment process creates an S3 bucket called `www.javed.dev` to hold the assets. This can be changed by editing the value of `APP_BUCKET_NAME` in `app/serverless.yml`.

## Deploying the Back End
1. Clone this repo.

2. Create an AWS IAM user with programmatic access. Add the keys to your local AWS credential files using the name `www-javed-dev`.

3. The application expects the following environment variables:

| Variable name | Description |
| :--- | :--- |
| `WWW_JAVED_DEV__SPOTIFY_NOW_PLAYING_URL` | The URL of the Spotify Now Playing API endpoint |
| `WWW_JAVED_DEV__SPOTIFY_NOW_PLAYING_KEY` | The API key for use with the Spotify Now Playing endpoint |

4. Deploy the `now-playing` service. From the project's root:
```
cd now-playing
npm install
serverless deploy [--stage dev|staging|prod]
```

## Building the Front End
Build the application front end. Go back to the project's root and do the following for a **development environment**:
```
cd app
npm install
npm run start
```
This will run the application in a local development server at `localhost:3000`. To create an optimized production build, run `npm run build`. The compiled assets will be created in the `build` folder.

This site uses the Bootstrap New Age theme located at https://github.com/BlackrockDigital/startbootstrap-new-age