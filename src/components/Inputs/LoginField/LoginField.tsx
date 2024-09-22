import { TextField } from '@aws-amplify/ui-react';
import { FieldProps } from '../types';

const LoginField = ({ size = 'small' }: FieldProps) => {
	return (
		<TextField
			placeholder='Please enter login'
			label='Login'
			errorMessage='Login is not valid'
			size={size}
		/>
	);
};

export default LoginField;
