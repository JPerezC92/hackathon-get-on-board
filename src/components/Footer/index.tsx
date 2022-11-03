import { HStack, Icon, Link, Text } from '@chakra-ui/react';
import { webRoutes } from '@/utilities/web.routes';
import { GetonboardIcon } from '../Navbar/GetonboardIcon';
import { Link as RouterLink, NavLinkProps } from 'react-router-dom';
export const Footer = () => {
	return (
		<HStack w={'100%'} py={5} as="footer" justifyContent={'center'} alignItems={'center'}>
			<Link as={RouterLink} to={webRoutes.root} zIndex="1">
				<Icon as={GetonboardIcon} />
			</Link>
		</HStack>
	);
};
