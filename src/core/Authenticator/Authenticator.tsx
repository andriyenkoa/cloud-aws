import {
	AuthenticatorProps,
	Authenticator as AWSAuthenticator,
} from '@aws-amplify/ui-react';
import { components } from './components';
import { formFields } from './formFields';

const Authenticator = (props: AuthenticatorProps) => {
	return (
		<AWSAuthenticator components={components} formFields={formFields}>
			{props.children}
		</AWSAuthenticator>
	);
};

export default Authenticator;
