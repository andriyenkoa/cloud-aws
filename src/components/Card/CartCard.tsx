import {
	Button,
	Card as CardAWS,
	Heading,
	Image,
	Text,
} from '@aws-amplify/ui-react';
import { toast } from 'sonner';
import generalAPI from '../../core/HTTPTransport/GeneralApi';
import { CartItem, useShoppingCart } from '../../core/Providers/CartProvider';

function CartCard({ item }: { item: CartItem }) {
	const { removeFromCart } = useShoppingCart();
	return (
		<CardAWS
			borderRadius='medium'
			margin='5px'
			variation='outlined'
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: '10px',
			}}
		>
			<Image
				width='50px'
				height='50px'
				src={item.ItemDetails.ImageURL}
				alt={item.ItemDetails.ProductName}
			/>
			<Heading padding='xs'>{item.ItemDetails.ProductName}</Heading>
			<Text
				variation='primary'
				as='p'
				lineHeight='1.5em'
				fontWeight={400}
				fontSize='1em'
				fontStyle='normal'
				textDecoration='none'
			>
				Price: {item.Price}
			</Text>
			<Text
				variation='primary'
				as='p'
				lineHeight='1.5em'
				fontWeight={400}
				fontSize='1em'
				fontStyle='normal'
				textDecoration='none'
			>
				Quantity:{' '}
				<span style={{ display: 'block', textAlign: 'right' }}>
					{item.Quantity}
				</span>
			</Text>
			<Button
				variation='destructive'
				onClick={async () => {
					const isApproved = await generalAPI.deleteProductFromCart(
						item.ItemId,
					);
					if (isApproved) {
						removeFromCart(item.ItemId);
						toast.success('Product is deleted');
					} else {
						toast.error('Cannot delete product');
					}
				}}
			>
				Remove
			</Button>
		</CardAWS>
	);
}

export default CartCard;
