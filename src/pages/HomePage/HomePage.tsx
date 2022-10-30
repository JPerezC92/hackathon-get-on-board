import { Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
	return (
		<div>
			<Heading>HomePage</Heading>

			<Link
				to={{
					pathname: '/jobs',
					// state:{{}}
				}}
				// params={{}}
			>
				dsa
			</Link>
		</div>
	);
};
