import { Footer } from '@/components';
import { Box, Container, Grid } from '@chakra-ui/react';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<Container
			maxWidth="container.xl"
			alignSelf="center"
			paddingX={5}
			bgPosition="center"
			bgRepeat="repeat"
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Grid templateRows="auto 1fr auto">
				<Box as={'main'}>{children}</Box>
				<Footer />
			</Grid>
		</Container>
	);
};

export default Layout;
