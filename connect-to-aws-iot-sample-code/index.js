// Import necessary AWS SDK modules
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { IoTDataPlaneClient, PublishCommand, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";

// Initialize your AWS configuration
const region = ''; // Replace with your desired region
const userPoolId = ''; // Replace with your User Pool Id
const clientId = ''; // Replace with your app client ID
const identityPoolId = ''; // Replace with your Cognito Identity Pool ID
const iotEndpoint = 'https://'; // Replace with your IoT endpoint

// Authenticate the user
const username = ''; // Replace with the actual username
const password = ''; // Replace with the actual password

const thingName = ''; // Replace with the actual thingName
const subID = ''; // Replace with the actual subID

// Create an instance of the Cognito Identity Client
const cognitoClient = new CognitoIdentityProviderClient({ region });

// Authenticate the user and get tokens
const authParams = {
  AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
  AuthParameters: {
    USERNAME: username,
    PASSWORD: password,
  },
  ClientId: clientId,
  UserPoolId: userPoolId
};
const authResponse = await cognitoClient.send(new InitiateAuthCommand(authParams));
const idToken = authResponse.AuthenticationResult.IdToken;

// Get temporary credentials from Cognito
const credentials = fromCognitoIdentityPool({
  identityPoolId,
  logins: {
    [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
  },
  clientConfig: { region }
});

// Initialize IoT Data Plane client
const iotClient = new IoTDataPlaneClient({
  region,
  endpoint: iotEndpoint,
  credentials: credentials
});

// Publish data to an IoT topic
const topicName = '$aws/things/' + thingName + '/shadow/update';
const payload = {
  state: {
    desired: { 
      [subID]: { 
        properties: { 
          'the-property-name': 'the-property-value'
        } 
      } 
    },
  },
};
const publishCommand = new PublishCommand({
  topic: topicName,
  payload: JSON.stringify(payload),
});
await iotClient.send(publishCommand);
console.log('publish OK');

// Get device shadow
const getShadowCommand = new GetThingShadowCommand({ thingName });
const shadowResponse = await iotClient.send(getShadowCommand);
const shadowState = JSON.parse(new TextDecoder('utf-8').decode(shadowResponse.payload));
console.log('shadowState:', shadowState); 
