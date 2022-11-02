import { useAuth } from '../../context/AuthProvider';
import { useState, useEffect } from 'react';
import './MyAccount.css';
import SuccessDiv from '../../components/modals/SuccessDiv';
import MyAccountLabels from './MyAccountLabels';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';

export interface UpdateAccountForm {
	email: string;
	password: string;
	name: string;
	phone?: string;
}

export const initialValues = {
	name: '',
	email: '',
	password: '',
};

const MyAccount = () => {
	const [userData, setUserData] = useState<UpdateAccountForm>(initialValues);
	const [errors, setErrors] = useState<UpdateAccountForm>(initialValues);
	const [success, setSuccess] = useState('');

	const { user, changeEmail, changePassword, changeName } = useAuth();
	console.log(userData, errors);

	// useEffect(()=>{
	// 	if(userData.email === user?.email) setUserData({...userData, email: ''})

	// },[userData.email])

	useEffect(() => {
		const currentErrors: UpdateAccountForm = { ...initialValues };
		if (userData.password.length) {
			if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?:[#?!@$%^&*-])?/.test(userData.password))
				currentErrors.password = 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero';
			if (!(userData.password.length > 5 && userData.password.length < 10) && userData.password.length) {
				currentErrors.password = 'La contraseña debe tener entre 6 y 10 caracteres';
			}
		}
		if (userData.name && !/^[a-z ,.'-]{3,}$/i.test(userData.name)) currentErrors.name = 'Nombre invalido';
		setErrors(currentErrors);
	}, [userData.email, userData.password, userData.name]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};
	const handleInputReset = (target: string) => {
		setUserData({
			...userData,
			[target]: '',
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let successMessage = '';
		const currentErrors: UpdateAccountForm = { ...initialValues };

		if (Object.values(errors).some((error) => error !== '') || !user) return false;
		const handleEmailChange = async () => {
			try {
				await changeEmail(userData.email);
				successMessage += ' + Email actualizado';
			} catch (error) {
				currentErrors.email += 'Email invalido';
			}
		};

		const handlePasswordChange = async () => {
			try {
				await changePassword(userData.password);
				successMessage += ' + Contraseña actualizada';
			} catch (error) {
				currentErrors.password += 'Debes iniciar sesion nuevamente para cambiar la contraseña';
			}
		};

		const handleNameChange = async () => {
			try {
				await changeName(userData.name);
				successMessage += ' + Nombre actualizado';
			} catch (error) {
				currentErrors.name += 'Nombre invalido';
			}
		};

		if (
			userData.email !== user.email &&
			!!userData.email &&
			userData.password &&
			userData.name !== user.displayName &&
			!!userData.name
		) {
			Promise.all([handleEmailChange(), handlePasswordChange(), handleNameChange()]).then(() => {
				setSuccess(successMessage);
			});
			return false
		} if (userData.email !== user.email && !!userData.email) {
			handleEmailChange().then(() => {
				setErrors(currentErrors);
				setSuccess(successMessage);
			});
		} if (userData.password) {
			handlePasswordChange().then(() => {
				setErrors(currentErrors);
				setSuccess(successMessage);
			});
		} if (userData.name !== user.displayName && !!userData.name) {
			handleNameChange().then(() => {
				setErrors(currentErrors);
				setSuccess(successMessage);
			});
		}
	};

	const labelsProps = {
		userData,
		errors,
		handleInputChange,
		handleInputReset,
		handleSubmit,
		user,
	};
	if (!success)
		return (
			<div className="myAccountContainer">
				<div className="myAccountHead">
					<span>Editar perfil</span>
				</div>
				<form className="myAccountForm" onSubmit={handleSubmit} autoComplete="off">
					<MyAccountLabels {...labelsProps} labelType={'email'} />
					<MyAccountLabels {...labelsProps} labelType={'name'} />
					<MyAccountLabels {...labelsProps} labelType={'password'} />
					{Object.values(errors).some((error) => error !== '') && (
						<AnimatePresence>
							{errors.email.length ? (
								<ErrorDiv key="modal">{errors.email}</ErrorDiv>
							) : errors.password.includes('nuevamente') || errors.password.includes('menos') ? (
								<ErrorDiv key="modal2">{errors.password}</ErrorDiv>
							) : errors.name ? (
								<ErrorDiv key="modal3">{errors.name}</ErrorDiv>
							) : null}
						</AnimatePresence>
					)}
					<div>
						<button type="button" onClick={() => setUserData(initialValues)}>
							Descartar
						</button>
						<button type="submit">Guardar</button>
					</div>
				</form>

				<img
					src="https://uploads-ssl.webflow.com/60832c1545a7b95d55205644/60832c1545a7b98163205661_logo-getonbrd.svg"
					alt="logo"
				/>
			</div>
		);
	return <SuccessDiv>{success}</SuccessDiv>;
};

export default MyAccount;
