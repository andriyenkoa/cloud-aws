/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import { LINKS } from '../constants/links';

// const Home = lazy(() => import('../pages/Home'));
const Catalog = lazy(() => import('../pages/Catalog'));
const Profile = lazy(() => import('../pages/Profile'));
const Product = lazy(() => import('../pages/Product'));
const Payment = lazy(() => import('../pages/Payment'));

const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <div>Error</div>,
		children: [
			{
				path: LINKS.main,
				element: <Catalog />,
			},
			{
				path: LINKS.catalog,
				element: <Catalog />,
			},
			{
				path: LINKS.profile,
				element: <Profile />,
			},
			{
				path: LINKS.payment,
				element: <Payment />,
			},
			{
				path: LINKS.product,
				element: <Product />,
			},
		],
	},
	{
		path: '*',
		element: <div>Page not found</div>,
	},
]);
export default router;
