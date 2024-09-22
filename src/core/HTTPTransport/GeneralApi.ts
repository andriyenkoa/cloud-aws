import { fetchAuthSession } from 'aws-amplify/auth';
import BaseApi from './BaseApi';
import { CartItem } from '../Providers/CartProvider';
import { Product } from './types';
import { StripeElementsOptions } from '@stripe/stripe-js';

class GeneralApi extends BaseApi {
	constructor() {
		super();
	}

	async productsForCatalog() {
		try {
			const response = await this.get('/products', {
				withCredentials: 'omit',
			});

			const data = await response.json();

			if (data.statusCode !== 200) {
				throw new Error('Forbidden');
			}

			return data.body.products as Product[];
		} catch (error) {
			throw new Error('Forbidden ' + (error as Error).message);
		}
	}

	async cartInfo() {
		try {
			const tokens = await fetchAuthSession();
			const userToken = tokens.userSub;

			const response = await this.get(`/cart/${userToken}`, {
				withCredentials: 'omit',
			});

			const data = await response.json();

			return data as Pick<CartItem, 'Quantity' | 'ItemId'>[];
		} catch (error) {
			throw new Error('Some Problem ' + (error as Error).message);
		}
	}

	async addToCart(itemId: string) {
		try {
			const tokens = await fetchAuthSession();
			const userToken = tokens.userSub;
			const currentCart = await this.cartInfo();
			const productQuantity =
				currentCart.find((item) => item.ItemId === itemId)?.Quantity || 0;

			const response = await this.post(`/cart/${userToken}`, {
				withCredentials: 'omit',
				data: {
					item_id: itemId,
					quantity: productQuantity + 1,
				},
			});

			return response.status === 200;
		} catch (error) {
			throw new Error('Some Problem ' + (error as Error).message);
		}
	}

	async deleteProductFromCart(id: string) {
		try {
			const tokens = await fetchAuthSession();
			const userToken = tokens.userSub;

			const response = await this.delete(`/cart/${userToken}`, {
				withCredentials: 'omit',
				data: {
					item_id: id,
				},
			});

			return response.status === 200;
		} catch (error) {
			throw new Error('Some Problem ' + (error as Error).message);
		}
	}

	async totalAmountPayment() {
		const tokens = await fetchAuthSession();
		const userToken = tokens.userSub;

		const response = await this.post(`/cart/payment/${userToken}`, {
			withCredentials: 'omit',
		});

		const data = await response.json();

		return {
			// mode: 'payment',
			// amount: data.totalAmount * 100,
			// currency: data.currency.toLowerCase(),
			clientSecret: data.clientSecret,
			appearance: {
				theme: 'stripe',
			},
		} as StripeElementsOptions;
	}
}

const generalAPI = new GeneralApi();

export default generalAPI;
