import { Divider, Flex } from '@aws-amplify/ui-react';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { useShoppingCart } from '../Providers/CartProvider';
import { NAVIGATION_LINKS } from '../../constants/links';

export default function Header() {
	const { cartQuantity, openCart } = useShoppingCart();
	return (
		<>
			<Flex padding='20px' justifyContent='space-between'>
				<Link to='/' className={classes.link}>
					IPort
				</Link>
				<Flex>
					{Object.entries(NAVIGATION_LINKS).map(([name, link]) => (
						<Link key={link} to={link}>
							{name}
						</Link>
					))}
				</Flex>
				<div className={classes.cart} onClick={openCart}>
					<ShoppingCartIcon />
					<div className={classes.count}>{cartQuantity}</div>
				</div>
			</Flex>
			<Divider />
		</>
	);
}
