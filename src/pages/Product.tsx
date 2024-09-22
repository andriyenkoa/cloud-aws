import { useLocation } from 'react-router-dom';

function Product() {
	const { state } = useLocation();

	return <div>Product</div>;
}

export default Product;
