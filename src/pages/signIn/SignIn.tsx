import './SignIn.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';
import { Flex } from '@chakra-ui/react';
import Layout from '@/layout';

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
		<Layout>
			<Flex justifyContent={'center'} alignContent={'center'} pt={15}>
				<div className="signInContainer">
					<div className="signInHead">
						<span>Iniciar sesion</span>
					</div>
					<form className="signInForm" onSubmit={handleSubmit}>
						<label>
							<span>Correo electronico</span>
							<input type="email" name="email" id="email" onChange={handleInputChange} autoFocus />
						</label>
						<label>
							<span>Contrasena</span>
							<input type="password" name="password" id="password" onChange={handleInputChange} />
						</label>
						<div>
							<Link to={'/register'}>No tengo una cuenta</Link>
							<Link to={'/recover'}>Recuperar contrasena</Link>
						</div>
						<button type="submit">Iniciar sesion</button>
					</form>
					<AnimatePresence>
						{formErrors.email.length ? (
							<ErrorDiv key="modal">{formErrors.email}</ErrorDiv>
						) : formErrors.password ? (
							<ErrorDiv key="modal2">{formErrors.password}</ErrorDiv>
						) : null}
					</AnimatePresence>
					<img
						src="https://uploads-ssl.webflow.com/60832c1545a7b95d55205644/60832c1545a7b98163205661_logo-getonbrd.svg"
						alt="logo"
					/>
				</div>
			</Flex>
		</Layout>
	);
};

export default SignIn;
