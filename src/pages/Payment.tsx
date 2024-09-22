import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';
import ElementsLayout from '../components/CheckoutForm/ElementsLayout';

function Payment() {
	const { state } = useLocation();
	const navigate = useNavigate();

	if (state.cartItemsLength === 0) {
		navigate('/catalog');
	}

	return (
		<ElementsLayout>
			<CheckoutForm />
		</ElementsLayout>
	);
}

export default Payment;
