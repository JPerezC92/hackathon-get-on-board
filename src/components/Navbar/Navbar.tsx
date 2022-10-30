import { Box, Flex, Icon, IconButton, Link, LinkProps, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { GiSettingsKnobs } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { Link as RouterLink, NavLinkProps } from 'react-router-dom';
import { GetonboardIcon } from './GetonboardIcon';

const getLinkList = (authenticated: boolean) => {
	interface Link {
		link: string;
		name: string;
	}

	const linkList = [
		// { link: '/', name: 'Inicio' },
		!authenticated && { link: '/login', name: 'Login' },
		!authenticated && { link: '/login', name: 'Register' },
	];

	return linkList.filter((v) => !!v) as Link[];
};

const NavBarLink: React.FC<LinkProps & NavLinkProps> = ({ children, ...props }) => {
	return (
		<Link
			{...props}
			as={RouterLink}
			fontWeight="medium"
			py="1"
			px="2"
			color="blue.400"
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
	const auth = false;

	const { isOpen, onToggle, onClose } = useDisclosure();
	return (
		<Flex
			as="header"
			borderBlockEnd="1px"
			borderBottomColor="blue.300"
			py="4"
			px={['2', null, null, '4']}
			alignItems="center"
			boxShadow="md"
			position="relative"
			width="100vw"
		>
			<Link as={RouterLink} to="/" zIndex="1" onClick={onClose}>
				<Icon as={GetonboardIcon} />
			</Link>

			<Box as="nav" ml="auto" display="flex" gap="2">
				<NavBarLink to="/">Inicio</NavBarLink>

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
					{getLinkList(auth).map((v) => (
						<Box as="li" key={v.name} listStyleType="none" display="contents">
							<NavBarLink to={v.link} onClick={onClose} width={['32', null, null, 'auto']} textAlign="center">
								{v.name}
							</NavBarLink>
						</Box>
					))}
				</Flex>

				<Box>
					{auth ? (
						<IconButton
							size="md"
							icon={<Icon as={GiSettingsKnobs} />}
							variant="ghost"
							color="blue.400"
							aria-label="nav-menu"
						/>
					) : (
						<IconButton
							size="md"
							icon={isOpen ? <Icon as={GrClose} /> : <Icon as={FaHamburger} />}
							display={['inline-flex', null, null, 'none']}
							onClick={onToggle}
							variant="ghost"
							color="blue.400"
							aria-label="nav-menu"
						/>
					)}
				</Box>
			</Box>
		</Flex>
	);
};
