import {
	Button,
	Divider,
	Heading,
	Image,
	Text,
	View,
	Card as CardAWS,
	Flex,
} from '@aws-amplify/ui-react';
import { Product } from '../../core/HTTPTransport/types';
import { useNavigate } from 'react-router-dom';
import { useShoppingCartActions } from '../../core/Providers/CartProvider';
import generalAPI from '../../core/HTTPTransport/GeneralApi';
import { toast } from 'sonner';
import { memo, useState } from 'react';

function Card({ item }: { item: Product }) {
	const [isAdding, setIsAdding] = useState(false);
	const navigate = useNavigate();
	const { increaseQuantityOfProducts } = useShoppingCartActions();

	const handleClickOnProduct = () => {
		navigate(`/product/${item.PK}`, {
			state: {
				product: item,
			},
		});
	};

	const handleClickBuyProduct = async (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsAdding(true);
		toast.info('Trying to add product in cart');
		const isApproved = await generalAPI.addToCart(item.PK);

		if (isApproved) {
			increaseQuantityOfProducts({
				ItemId: item.PK,
				Price: item.Price,
				ItemDetails: {
					ProductName: item.Detail.ProductName,
					ImageURL: item.ImageURL,
				},
			});
			toast.success('Product is added');
		} else {
			toast.error('Cannot add product');
		}

		setIsAdding(false);
	};
	return (
		<CardAWS
			borderRadius='medium'
			maxWidth='20rem'
			variation='outlined'
			onClick={handleClickOnProduct}
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Image src={item.ImageURL} alt={item.Detail.ProductName} />
			<Flex marginTop='auto' direction='column' justifyContent='space-between'>
				<Heading padding='xs'>{item.Detail.ProductName}</Heading>
				<Divider padding='xs' />
				<View height='100%'>
					<Text
						variation='primary'
						as='p'
						lineHeight='1.5em'
						fontWeight={400}
						fontSize='1em'
						fontStyle='normal'
						textDecoration='none'
					>
						{item.Price}
					</Text>
					<Button
						isDisabled={isAdding}
						variation='primary'
						isFullWidth
						onClick={handleClickBuyProduct}
					>
						Add to cart
					</Button>
				</View>
			</Flex>
		</CardAWS>
	);
}

export default memo(Card);
