import { Box, Flex, Icon, IconButton, Link, LinkProps, useDisclosure } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { Link as RouterLink, NavLinkProps } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import SignOut from '../../pages/signOut/SignOut';
import { webRoutes } from '../../utilities/web.routes';
import { GetonboardIcon } from './GetonboardIcon';

const getLinkList = (user: User | null | undefined) => {
	interface Link {
		link: string;
		name: string;
	}

	const authenticated = user;

	const linkList = [
		!authenticated && { link: webRoutes.login, name: 'Login' },
		!authenticated && { link: webRoutes.register, name: 'Register' },
	];

	return linkList.filter((v) => !!v) as Link[];
};

export const NavBarLink: React.FC<LinkProps & NavLinkProps> = ({ children, ...props }) => {
	return (
		<Link
			{...props}
			as={RouterLink}
			fontWeight="medium"
			py="1"
			px="2"
			color={'primary.700'}
			textAlign="center"
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
		>
			{children}
		</Link>
	);
};

export const Nabvar = () => {
	const { user } = useAuth();
	const { isOpen, onToggle, onClose } = useDisclosure();

	return (
		<Flex
			zIndex="1"
			as="header"
			borderBlockEnd="1px"
			borderBottomColor="primary-ligth.400"
			py="4"
			px={['2', null, null, '4']}
			alignItems="center"
			boxShadow="md"
			position="relative"
			width="100vw"
		>
			<Link as={RouterLink} to={webRoutes.root} zIndex="1" onClick={onClose}>
				<Icon as={GetonboardIcon} />
			</Link>

			<Box as="nav" ml="auto" display="flex" gap="2">
				<NavBarLink to={webRoutes.root}>Inicio</NavBarLink>

				<Flex
					as="ul"
					gap="2"
					alignItems="center"
					position={['absolute', null, null, 'revert']}
					top="0"
					justifyContent={['center', null, null, 'end']}
					flexDirection={['column', null, null, 'row']}
					backgroundColor={['white', null, null, 'transparent']}
					transition="left 0.3s ease-in-out"
					left={isOpen ? '0' : '+200%'}
					width="full"
					h={['100vh', null, null, 'auto']}
				>
					{getLinkList(user).map((v) => (
						<Box as="li" key={v.name} listStyleType="none" display="contents">
							<NavBarLink to={v.link} onClick={onClose} width={['32', null, null, 'auto']} textAlign="center">
								{v.name}
							</NavBarLink>
						</Box>
					))}
					{!!user && (
						<NavBarLink to={webRoutes.profile} onClick={onClose}>
							Perfil
						</NavBarLink>
					)}
					{!!user && (
						<NavBarLink to={webRoutes.jobsApplied} onClick={onClose}>
							Postulaciones
						</NavBarLink>
					)}
					{!!user && <SignOut onClick={onClose}>Desconectar</SignOut>}
				</Flex>

				<Box>
					<IconButton
						size="md"
						icon={isOpen ? <Icon as={GrClose} /> : <Icon as={FaHamburger} />}
						display={['inline-flex', null, null, 'none']}
						onClick={onToggle}
						variant="ghost"
						color="primary-ligth.400"
						aria-label="nav-menu"
					/>
				</Box>
			</Box>
		</Flex>
	);
};
