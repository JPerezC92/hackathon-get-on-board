import './SignUp.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';

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
		if (!(formValues.password.length > 6 && formValues.password.length < 10) && formValues.password.length){
			errors.password = 'La contraseña debe tener entre 6 y 10 caracteres';
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
			console.log(error);
			setFormErrors({ ...formErrors, email: 'El correo electronico ya ha sido usado' });
		}
	};
	console.log(formErrors);
	return (
		<div className="signUpContainer">
			<div className="signUpHead">
				<span>Registrarse</span>
			</div>
			<form className="signUpForm" onSubmit={handleSubmit}>
				<label>
					<span>Correo electronico</span>
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
					<span>Contrasena</span>
					<input
						className={formErrors.password ? 'error' : ''}
						type="password"
						name="password"
						id="password"
						onChange={handleInputChange}
					/>
				</label>
				<label>
					<span>Confirmar contrasena</span>
					<input
						className={formErrors.repeatPassword ? 'error' : ''}
						type="password"
						name="repeatPassword"
						id="repeatPassword"
						onChange={handleInputChange}
					/>
				</label>
				<div>
					<Link to={'/login'}>Tengo una cuenta</Link>
				</div>
				<button type="submit">Registrarse</button>
			</form>
			<AnimatePresence>
				{formErrors.email.length && (
					<ErrorDiv key="modal3">{formErrors.email}</ErrorDiv>
				)}
			</AnimatePresence>
			<img
				src="https://uploads-ssl.webflow.com/60832c1545a7b95d55205644/60832c1545a7b98163205661_logo-getonbrd.svg"
				alt="logo"
			/>
		</div>
	);
};

export default SignUp;
