import { useAuthenticator } from '@aws-amplify/ui-react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loader from '../../components/Loader/Loader';
import Authenticator from '../Authenticator/Authenticator';
import Header from '../Header/Header';
import { ShoppingCartProvider } from '../Providers/CartProvider';

const Layout = () => {
	const { authStatus } = useAuthenticator((context) => [context.authStatus]);

	if (authStatus !== 'authenticated') {
		return <Authenticator />;
	}

	return (
		<>
			<ShoppingCartProvider>
				<Toaster richColors />
				<Header />
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</ShoppingCartProvider>
		</>
	);
};

export default Layout;
