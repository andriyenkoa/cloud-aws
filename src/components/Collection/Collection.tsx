import { Collection as CollectionAWS } from '@aws-amplify/ui-react';
import { Product } from '../../core/HTTPTransport/types';
import Card from '../Card/Card';

function Collection({ products }: { products: Product[] }) {
	return (
		<CollectionAWS
			items={products}
			type='list'
			direction='row'
			gap='20px'
			wrap='wrap'
			width='100%'
			justifyContent='space-between'
		>
			{(item) => <Card key={item.PK} item={item} />}
		</CollectionAWS>
	);
}

export default Collection;
