import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import generalAPI from '../../core/HTTPTransport/GeneralApi';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

function ElementsLayout({ children }: { children: React.ReactNode }) {
	const [paymentOptions, setPaymentOptions] = useState<StripeElementsOptions>(
		{},
	);

	useEffect(() => {
		generalAPI.totalAmountPayment().then((res) => setPaymentOptions(res));
	}, []);


	return (
		<Elements
			stripe={stripePromise}
			options={paymentOptions}
			key={paymentOptions?.clientSecret}
		>
			{Object.keys(paymentOptions).length > 0 && children}
		</Elements>
	);
}

export default ElementsLayout;
