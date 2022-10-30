import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Search } from '../../components/Search';

export const HomePage: React.FC = () => {
	return (
		<div>
			<Heading>HomePage</Heading>

			<Search />
		</div>
	);
};
