/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
/* we want to allow console logging in Lambda functions in order to use AWS CloudWatch */

const request = require('request');

const getNowPlaying = () => {
  const params = {
    url: `${process.env.API_URL}?key=${process.env.API_KEY}`
  };

  return new Promise((resolve, reject) => {
    request(params, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error || response);
      }
    });
  });
};

const successResponse = (body, callback) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'www.javed.dev'
    },
    body: body
  });

const errorResponse = (error, callback) => {
  console.error('error:', error);
  callback(null, {
    statusCode: 401
  });
};

const nowPlaying = async (event, context, callback) => {
  try {
    const playing = await getNowPlaying();
    return successResponse(playing, callback);
  } catch (error) {
    return errorResponse(error, callback);
  }
};

module.exports = {
  nowPlaying
};
