const fs = require('fs');
const AWS = require('aws-sdk');
const querystring = require('querystring');
const uuidv4 = require('uuid/v4');

class NowPlayingDeploymentPlugin {
    constructor(serverless) {
        this.hooks = {
            "after:deploy:deploy": this.afterDeploy.bind(null, serverless)
        }
    }

    afterDeploy(serverless) {
      return new Promise(function(resolve, reject) {
        const provider = serverless.service.provider;
        const custom = serverless.service.custom;
        const service = serverless.service.service;

        const credentials = new AWS.SharedIniFileCredentials({ profile: provider.profile });
        const region = provider.region;
        const cloudFormation = new AWS.CloudFormation({ credentials, region });

        const params = {
          StackName: `${service}-${custom.stage}`
        };

        cloudFormation.describeStackResources(params, function(err, response) {
          if (err) {
            console.log(err, err.stack);
            return reject(err);
          } else {
            const apiGatewayRestApi = response.StackResources.find(resource => resource.LogicalResourceId === "ApiGatewayRestApi").PhysicalResourceId;
            const apiUrl = provider.environment.API_WRAPPER_URL ? `${provider.environment.API_WRAPPER_URL}/nowplaying` : `https://${apiGatewayRestApi}.execute-api.${region}.amazonaws.com/${custom.stage}/nowplaying`;
            const fileContents = `const ${service.replace(/-/g, '_')}_apiurl = '${apiUrl}';`;
            const path = custom.config_path;

            if (!fs.existsSync(path)) {
              fs.mkdirSync(path);
            }
            console.log(fileContents);
            fs.writeFileSync(`${path}/${service}.js`, fileContents);
            return resolve(response);
          }
        });
      });
    }
}

module.exports = NowPlayingDeploymentPlugin;
