import { Button, Divider, Flex, Heading } from '@aws-amplify/ui-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../core/Providers/CartProvider';
import useClickOutside from '../../utils/hooks/useClickOutside';
import CartCard from '../Card/CartCard';
import classes from './ShoppingCart.module.css';

function ShoppingCart({ isOpen }: { isOpen: boolean }) {
	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);
	const { closeCart, cartItems, cartQuantity } = useShoppingCart();

	useClickOutside(ref, closeCart);

	const handleNavigateToPayment = () => {
		if (cartItems.length > 0) {
			closeCart();
			navigate('/payment', {
				state: {
					cartItemsLength: cartItems.length,
				},
			});
		}
	};

	return (
		<Flex
			ref={ref}
			className={classes.wrapper}
			display={`${!isOpen ? 'none' : 'flex'}`}
			direction='column'
			justifyContent='flex-start'
			alignItems='stretch'
			alignContent='flex-start'
			wrap='wrap'
			gap='1rem'
			height='100dvh'
			backgroundColor='gray'
		>
			<Heading padding='xs'>Shoping Cart</Heading>
			<Divider />
			{isOpen &&
				cartItems.map((item) => <CartCard key={item.ItemId} item={item} />)}
			{cartQuantity ? (
				<Button variation='primary' onClick={handleNavigateToPayment}>
					Go to payment
				</Button>
			) : (
				'Cart is empty'
			)}
		</Flex>
	);
}

export default ShoppingCart;
