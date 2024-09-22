import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
	Auth: {
		region: 'eu-north-1',
		userPoolId: 'eu-north-1_Iwq4P07nk',
	},
});

const currentConfig = Auth.configure();

export default currentConfig;
