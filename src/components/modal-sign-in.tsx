import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useEffect, useState } from 'react';

export function ModalSignIn() {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => {
		sessionStorage.setItem('signInClosed', JSON.stringify(true));
		setIsOpen(false);
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
	};

	useEffect(() => {
		const signInClosed = JSON.parse(sessionStorage.getItem('signInClosed') ?? 'false');
		if (signInClosed) return;
		setTimeout(() => {
			setIsOpen(true);
		}, 10 * 1000);
	}, []);

	return (
		<Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent maxWidth={450}>
				<ModalHeader textAlign={'center'}>Disfruta toda la experiencia</ModalHeader>
				<ModalBody>
					<VStack as={'form'} onSubmit={onSubmit}>
						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input type="email" placeholder="example@example.com" />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Contraseña</FormLabel>
							<Input type="password" placeholder="********" />
						</FormControl>
						<Button width="100%" variant="solid" type="submit">
							Iniciar sessión
						</Button>
						<VStack width={'100%'}>
							<Button width="100%" variant="outline" leftIcon={<FcGoogle />} colorScheme={'gray'}>
								Google
							</Button>
						</VStack>
						<Link as={RouterLink} to="/register">
							Si no tienes cuenta, regístrate
						</Link>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

