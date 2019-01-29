'use strict'

module.exports = SanitizeStageName;


function SanitizeStageName(serverless, options) {
    this.hooks = {
        'before:package:finalize': () => sanitizeStageName(serverless)
    }
}

function sanitizeStageName(serverless) {

    let resources = serverless.service.provider.compiledCloudFormationTemplate.Resources
    for (let key in resources) {
        let resource = resources[key];
        if (resource.Type === 'AWS::ApiGateway::Deployment') {
            let properties = resource.Properties;
            properties.StageName = properties.StageName.replace(/[^a-zA-Z0-9_]/g, '_');
        }
    }
}

