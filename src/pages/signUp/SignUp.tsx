import './SignUp.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { GetonboardIcon } from '@/components/Navbar/GetonboardIcon';
import Layout from '@/layout';

interface SignUpFormValues {
	email: string;
	password: string;
	repeatPassword?: string;
}

const SignUp = () => {
	const [formValues, setFormValues] = useState<SignUpFormValues>({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [formErrors, setFormErrors] = useState<SignUpFormValues>({
		email: '',
		password: '',
		repeatPassword: '',
	});

	useEffect(() => {
		const errors: SignUpFormValues = {
			email: '',
			password: '',
			repeatPassword: '',
		};
		if (!(formValues.password.length > 5 && formValues.password.length < 21) && formValues.password.length) {
			errors.password = 'La contraseña debe tener entre 6 y 20 caracteres';
		}
		if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?:[#?!@$%^&*-])?/.test(formValues.password))
			errors.password = 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero';
		if (formValues.password !== formValues.repeatPassword) errors.repeatPassword = 'Las contraseñas no coinciden';
		setFormErrors(errors);
	}, [formValues.email, formValues.password, formValues.repeatPassword]);

	const { signUp } = useAuth();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formErrors.password || formErrors.repeatPassword) return false;
		try {
			await signUp(formValues.email, formValues.password);
		} catch (error) {
			setFormErrors({ ...formErrors, email: 'El correo electronico ya ha sido usado' });
		}
	};

	return (
		<Layout>
			<Flex justifyContent={'center'} alignItems={'center'} pt={'2rem'}>
				<Box
					className="signUpContainer"
					pb={10}
					rounded={'md'}
					borderWidth={'1px'}
					borderColor={'primary.500'}
					shadow={'lg'}
				>
					<Flex mt={5}>
						<Icon as={GetonboardIcon} />
					</Flex>
					{/* <div className="signUpHead">
					<span>Registrarse</span>
				</div> */}
					<Text fontSize={'xl'} color={'secondary.400'} my={2}>
						Registrarse
					</Text>
					<form className="signUpForm" onSubmit={handleSubmit}>
						<label>
							<span>Correo electrónico</span>
							<input
								className={formErrors.email ? 'error' : ''}
								type="email"
								name="email"
								id="email"
								autoFocus
								onChange={handleInputChange}
							/>
						</label>
						<label>
							<span>Contraseña</span>
							<input
								className={formErrors.password ? 'error' : ''}
								type="password"
								name="password"
								id="password"
								onChange={handleInputChange}
							/>
						</label>
						<label>
							<span>Confirmar contraseña</span>
							<input
								className={formErrors.repeatPassword ? 'error' : ''}
								type="password"
								name="repeatPassword"
								id="repeatPassword"
								onChange={handleInputChange}
							/>
						</label>
						<div>
							<Link to={'/inicio'}>Tengo una cuenta</Link>
						</div>
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
							Registrarse
						</Button>
					</form>
					<AnimatePresence>
						{formErrors.email.length && <ErrorDiv key="modal3">{formErrors.email}</ErrorDiv>}
					</AnimatePresence>
				</Box>
			</Flex>
		</Layout>
	);
};

export default SignUp;
