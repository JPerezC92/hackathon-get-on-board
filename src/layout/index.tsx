import { Footer } from '@/components';
import { Nabvar } from '@/components/Navbar';
import { Box, Container, Grid } from '@chakra-ui/react';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<Grid templateRows="auto 1fr auto" h="100vh">
			<Nabvar />

			<Container maxWidth="container.xl" paddingX={5} h="full">
				<Box as={'main'} display="contents">
					{children}
				</Box>
			</Container>

			<Footer />
		</Grid>
	);
};

export default Layout;
