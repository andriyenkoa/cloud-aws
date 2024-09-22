import { Authenticator } from '@aws-amplify/ui-react';

import ThemeProvider from './ThemeProvider/ThemeProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<Authenticator.Provider>{children}</Authenticator.Provider>
		</ThemeProvider>
	);
};

export default Providers;
