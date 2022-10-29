import { Button } from '@chakra-ui/react';
import Layout from './layout';
import { Routes } from './routes';

function App() {
	return (
		<Layout>
			<Button>HackaJob</Button>
			<Routes />
		</Layout>
	);
}

export default App;

