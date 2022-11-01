import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
