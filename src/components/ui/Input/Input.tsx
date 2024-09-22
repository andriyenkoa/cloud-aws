import { forwardRef } from 'react';
import { Input as AWSInput, InputProps } from '@aws-amplify/ui-react';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <AWSInput ref={ref} {...props} />;
});

export default Input;
