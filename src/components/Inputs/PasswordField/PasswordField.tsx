import { PasswordField as AWSPasswordField } from '@aws-amplify/ui-react';
import { FieldProps } from '../types';

const PasswordField = ({ size = 'small' }: FieldProps) => {
	return (
		<AWSPasswordField
			placeholder='Please enter password'
			label='Password'
			name='password'
			errorMessage='Password is not valid'
			size={size}
		/>
	);
};

export default PasswordField;
