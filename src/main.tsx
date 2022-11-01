
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './Router';
import theme from './theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>,
);
