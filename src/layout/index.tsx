import { Box, Container } from '@chakra-ui/react';
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
			<Box as={'main'}>{children}</Box>
		</Container>
	);
};

export default Layout;
