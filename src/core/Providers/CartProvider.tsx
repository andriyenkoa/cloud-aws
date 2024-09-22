import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import generalAPI from '../HTTPTransport/GeneralApi';
import { toast } from 'sonner';

interface ShoppingCartContext {
	openCart: () => void;
	closeCart: () => void;
	getQuantityOfProduct: (id: string) => number;
	removeFromCart: (id: string) => void;
	setProductsFromBackend: () => Promise<
		Pick<CartItem, 'Quantity' | 'ItemId'>[]
	>;

	cartQuantity: number;
	cartItems: CartItem[];
}

export interface CartItem {
	ItemId: string;
	Price: string;
	Quantity: number;
	ItemDetails: {
		ProductName: string;
		ImageURL: string;
	};
}

export type Actions = {
	increaseQuantityOfProducts: (cart: Omit<CartItem, 'Quantity'>) => void;
	decreaseQuantityOfProducts: (id: string) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);
const ShoppingCartActionsContext = createContext({} as Actions);

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}
export function useShoppingCartActions() {
	return useContext(ShoppingCartActionsContext);
}

export function ShoppingCartProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const cartQuantity = cartItems.reduce((acc, cur) => cur.Quantity + acc, 0);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const getQuantityOfProduct = useCallback(
		(id: string) => {
			return cartItems?.find((item) => item.ItemId === id)?.Quantity || 0;
		},
		[cartItems],
	);

	const increaseQuantityOfProducts = useCallback(
		(cart: Omit<CartItem, 'Quantity'>) => {
			setCartItems((prev) => {
				if (!prev.find((item) => item.ItemId === cart.ItemId)) {
					return [...prev, { ...cart, ItemId: cart.ItemId, Quantity: 1 }];
				} else {
					return prev.map((item) => {
						if (item.ItemId === cart.ItemId) {
							return {
								...item,
								Quantity: item.Quantity + 1,
							};
						} else return item;
					});
				}
			});
		},
		[setCartItems],
	);

	const decreaseQuantityOfProducts = useCallback(
		(id: string) => {
			setCartItems((prev) => {
				if (prev.find((item) => item.ItemId === id)?.Quantity === 1) {
					return prev.filter((item) => item.ItemId !== id);
				} else {
					return prev.map((item) => {
						if (item.ItemId === id) {
							return {
								...item,
								Quantity: item.Quantity - 1,
							};
						} else return item;
					});
				}
			});
		},
		[setCartItems],
	);

	const removeFromCart = useCallback(
		(id: string) => {
			setCartItems((prev) => prev.filter((item) => item.ItemId !== id));
		},
		[setCartItems],
	);

	const setProductsFromBackend = async () => {
		const products = await generalAPI.productsForCatalog();
		const data = await generalAPI.cartInfo();

		const carts = data.reduce((acc, cur) => {
			const findProduct = products.find((item) => item.PK === cur.ItemId);

			if (findProduct) {
				acc.push({
					ItemId: cur.ItemId,
					Price: findProduct.Price,
					Quantity: cur.Quantity,
					ItemDetails: {
						ProductName: findProduct.Detail.ProductName,
						ImageURL: findProduct.ImageURL,
					},
				});
				return acc;
			} else return acc;
		}, [] as CartItem[]);

		setCartItems(carts);

		return carts;
	};

	const actions = useMemo(
		() => ({
			increaseQuantityOfProducts,
			decreaseQuantityOfProducts,
		}),
		[increaseQuantityOfProducts, decreaseQuantityOfProducts],
	);

	useEffect(() => {
		toast.promise(setProductsFromBackend, {
			success: 'Shopping cart is updated!',
			loading: 'Trying to update shopping cart',
			error: 'Oops, something went wrong!',
		});
	}, []);

	return (
		<ShoppingCartContext.Provider
			value={{
				getQuantityOfProduct,
				cartItems,
				cartQuantity,
				openCart,
				closeCart,
				setProductsFromBackend,
				removeFromCart,
			}}
		>
			<ShoppingCartActionsContext.Provider value={actions}>
				{children}
			</ShoppingCartActionsContext.Provider>
			<ShoppingCart isOpen={isOpen} />
		</ShoppingCartContext.Provider>
	);
}
