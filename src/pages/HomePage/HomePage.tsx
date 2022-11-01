import React from 'react';
import { Filters } from '../../components/Filters';
import Layout from '../../layout';

export const HomePage: React.FC = () => {
	return (
		<Layout>
			<Filters />
		</Layout>
	);
};
