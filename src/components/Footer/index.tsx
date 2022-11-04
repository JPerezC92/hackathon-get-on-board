import { webRoutes } from '@/utilities/web.routes';
import { HStack, Icon, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { GetonboardIcon } from '../Navbar/GetonboardIcon';
export const Footer = () => {
	return (
		<HStack w={'100%'} py={5} as="footer" justifyContent={'center'} alignItems={'center'}>
			<Link as={RouterLink} to={webRoutes.root} zIndex="1">
				<Icon as={GetonboardIcon} />
			</Link>
		</HStack>
	);
};
