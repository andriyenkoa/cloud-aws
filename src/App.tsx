import '@aws-amplify/ui-react/styles/base.layer.css';
import '@aws-amplify/ui-react/styles/button.layer.css';
import '@aws-amplify/ui-react/styles/reset.layer.css';
import { Amplify } from 'aws-amplify';
import Providers from './core/Providers/Providers';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './core/router';

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: import.meta.env.VITE_USER_POOL_ID ?? '',
			userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID ?? '',
		},
	},
});

function App() {
	return (
		<Providers>
			<RouterProvider router={router} />
		</Providers>
	);
}

export default App;
