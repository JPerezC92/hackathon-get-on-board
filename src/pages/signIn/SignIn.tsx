import './SignIn.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';
import { Box, Button, Flex, Icon, Image, Input, Text } from '@chakra-ui/react';
import { GetonboardIcon } from '@/components/Navbar/GetonboardIcon';

interface SignInFormValues {
	email: string;
	password: string;
}

const SignIn = () => {
	const [formValues, setFormValues] = useState<SignInFormValues>({
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState<SignInFormValues>({
		email: '',
		password: '',
	});

	const { signIn } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await signIn(formValues.email, formValues.password);
		} catch (error) {
			error instanceof Error && error.message.split(':')[1].includes('user')
				? setFormErrors({ password: '', email: 'Usuario no encontrado' })
				: setFormErrors({ email: '', password: 'Contraseña incorrecta' });
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
		setFormErrors({
			email: '',
			password: '',
		});
	};

	return (
		<Flex justifyContent={'center'} alignContent={'center'} pt={'2rem'}>
			<Box
				className="signInContainer"
				pb={10}
				rounded={'md'}
				borderWidth={'1px'}
				borderColor={'primary.500'}
				shadow={'lg'}
			>
				<Flex mt={5}>
					<Icon as={GetonboardIcon} />
				</Flex>
				<Text fontSize={'xl'} color={'secondary.400'} my={5}>
					{/* <span>Iniciar sesion</span> */}
					Iniciar sesión
				</Text>
				<form className="signInForm" onSubmit={handleSubmit}>
					<label>
						<span>Correo electrónico</span>
						<input type="email" name="email" id="email" onChange={handleInputChange} autoFocus />
						{/* <Input type="email" name="email" id="email" onChange={handleInputChange} autoFocus /> */}
					</label>
					<label>
						<span>Contraseña</span>
						<input type="password" name="password" id="password" onChange={handleInputChange} />
					</label>
					<div>
						<Link to={'/register'}>No tengo una cuenta</Link>
						<Link to={'/recover'}>Recuperar contrasena</Link>
					</div>
					{/* <button type="submit">Iniciar sesion</button> */}

					<Button
						bgColor={'primary.400'}
						_hover={{
							backgroundColor: 'primary.500',
						}}
						_active={{
							backgroundColor: 'primary.500',
						}}
						my={5}
						type="submit"
						width={'65%'}
					>
						Iniciar sesión
					</Button>
				</form>
				<AnimatePresence>
					{formErrors.email.length ? (
						<ErrorDiv key="modal">{formErrors.email}</ErrorDiv>
					) : formErrors.password ? (
						<ErrorDiv key="modal2">{formErrors.password}</ErrorDiv>
					) : null}
				</AnimatePresence>
			</Box>
		</Flex>
	);
};

export default SignIn;
