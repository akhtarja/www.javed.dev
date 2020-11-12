const fs = require('fs');
const AWS = require('aws-sdk');

class NowPlayingDeploymentPlugin {
  constructor(serverless) {
    this.hooks = {
      'after:deploy:deploy': this.afterDeploy.bind(null, serverless)
    };
  }

  afterDeploy(serverless) {
    return new Promise(function (resolve, reject) {
      const provider = serverless.service.provider;
      const custom = serverless.service.custom;
      const service = serverless.service.service;

      if (custom.stage === 'dev') {
        const credentials = new AWS.SharedIniFileCredentials({
          profile: provider.profile
        });
      }
      const region = provider.region;
      const cloudFormation =
        custom.stage === 'dev'
          ? new AWS.CloudFormation({ credentials, region })
          : new AWS.CloudFormation({ region });

      const params = {
        StackName: `${service}-${custom.stage}`
      };
      let apiUrl = '';

      cloudFormation.describeStackResources(params, function (err, response) {
        if (err) {
          console.log(err, err.stack);
          return reject(err);
        } else {
          const apiGatewayRestApi = response.StackResources.find(
            resource => resource.LogicalResourceId === 'ApiGatewayRestApi'
          ).PhysicalResourceId;
          if (custom.stage === 'prod' && provider.environment.API_WRAPPER_URL) {
            apiUrl = `${provider.environment.API_WRAPPER_URL}/nowplaying`;
          } else {
            apiUrl = `https://${apiGatewayRestApi}.execute-api.${region}.amazonaws.com/${custom.stage}/nowplaying`;
          }
          const fileContents = `const ${service.replace(
            /-/g,
            '_'
          )}_apiurl = '${apiUrl}';`;
          const path = custom.config_path;

          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          fs.writeFileSync(`${path}/${service}.js`, fileContents);
          return resolve(response);
        }
      });
    });
  }
}

module.exports = NowPlayingDeploymentPlugin;
