import { ThemeProvider as AWSThemeProvider } from '@aws-amplify/ui-react';
import { theme } from './theme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <AWSThemeProvider theme={theme}>{children}</AWSThemeProvider>;
};

export default ThemeProvider;
