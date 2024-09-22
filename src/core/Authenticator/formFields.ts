import { AuthenticatorProps } from '@aws-amplify/ui-react';

export const formFields: AuthenticatorProps['formFields'] = {
	signIn: {
		password: {
			placeholder: 'Enter your password',
			order: 2,
		},
		username: {
			label: 'Email',
			placeholder: 'Enter your email',
			order: 1,
		},
	},
	signUp: {
		username: {
			label: 'Email: ',
			placeholder: 'Enter your email',
			isRequired: true,
			order: 1,
		},
		given_name: {
			label: 'First name: ',
			placeholder: 'Enter your first name',
			isRequired: true,
			order: 2,
		},
		phone_number: {
			label: 'Phone: ',
		},
		family_name: {
			label: 'Second name: ',
			placeholder: 'Enter your second name',
			isRequired: true,
			order: 3,
		},
		password: {
			label: 'Password:',
			placeholder: 'Enter your Password:',
			isRequired: true,
		},
		confirm_password: {
			label: 'Confirm Password:',
		},
	},
	forceNewPassword: {
		password: {
			placeholder: 'Enter your Password:',
		},
	},
	forgotPassword: {
		email: {
			placeholder: 'Enter your email:',
		},
	},
	confirmResetPassword: {
		confirmation_code: {
			placeholder: 'Enter your Confirmation Code:',
			label: 'New Label',
			isRequired: false,
		},
		confirm_password: {
			placeholder: 'Enter your Password Please:',
		},
	},
	setupTotp: {
		QR: {
			totpIssuer: 'test issuer',
			totpUsername: 'amplify_qr_test_user',
		},
		confirmation_code: {
			label: 'New Label',
			placeholder: 'Enter your Confirmation Code:',
			isRequired: false,
		},
	},
	confirmSignIn: {
		confirmation_code: {
			label: 'New Label',
			placeholder: 'Enter your Confirmation Code:',
			isRequired: false,
		},
	},
};
