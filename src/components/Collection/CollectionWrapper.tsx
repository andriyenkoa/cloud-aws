import { useEffect, useState } from 'react';
import { Product } from '../../core/HTTPTransport/types';
import Collection from './Collection';
import generalAPI from '../../core/HTTPTransport/GeneralApi';
import { Loader } from '@aws-amplify/ui-react';

function ProductCatalog() {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		setIsLoading(true);
		generalAPI
			.productsForCatalog()
			.then((res) => {
				setProducts(res);
			})
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading ? (
				<Loader size='large' variation='linear' />
			) : products.length > 0 ? (
				<Collection products={products} />
			) : (
				'There is no product in our catalog. Sorry...'
			)}
		</>
	);
}

export default ProductCatalog;
