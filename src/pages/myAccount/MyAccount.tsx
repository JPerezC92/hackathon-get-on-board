import { useAuth } from '../../context/AuthProvider';
import { useState, useEffect } from 'react';
import './MyAccount.css';
import SuccessDiv from '../../components/modals/SuccessDiv';
import MyAccountLabels from './MyAccountLabels';
import { AnimatePresence } from 'framer-motion';
import ErrorDiv from '../../components/modals/ErrorDiv';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { GetonboardIcon } from '@/components/Navbar/GetonboardIcon';
import Layout from '@/layout';

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

	// useEffect(()=>{
	// 	if(userData.email === user?.email) setUserData({...userData, email: ''})

	// },[userData.email])

	useEffect(() => {
		const currentErrors: UpdateAccountForm = { ...initialValues };
		if (userData.password.length) {
			if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?:[#?!@$%^&*-])?/.test(userData.password))
				currentErrors.password = 'La contraseña debe tener al menos una mayuscula, una minuscula y un numero';
			if (!(userData.password.length > 5 && userData.password.length < 21) && userData.password.length) {
				currentErrors.password = 'La contraseña debe tener entre 6 y 20 caracteres';
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
			return false;
		}
		if (userData.email !== user.email && !!userData.email) {
			handleEmailChange().then(() => {
				setErrors(currentErrors);
				setSuccess(successMessage);
			});
		}
		if (userData.password) {
			handlePasswordChange().then(() => {
				setErrors(currentErrors);
				setSuccess(successMessage);
			});
		}
		if (userData.name !== user.displayName && !!userData.name) {
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
			<Layout>
				<Flex justifyContent={'center'} alignItems={'center'} pt={'2rem'}>
					<Box
						className="myAccountContainer"
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
							Editar perfil
						</Text>
						<form className="myAccountForm" onSubmit={handleSubmit} autoComplete="off">
							<MyAccountLabels {...labelsProps} labelType={'email'} />
							<MyAccountLabels {...labelsProps} labelType={'name'} />
							<MyAccountLabels {...labelsProps} labelType={'password'} />
							<div>
								{/* <button type="button" onClick={() => setUserData(initialValues)}>
								Descartar
							</button> */}
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
									onClick={() => setUserData(initialValues)}
								>
									Descartar
								</Button>
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
									Guardar
								</Button>
							</div>{' '}
						</form>
						<div className="errorContainer">
							{Object.values(errors).some((error) => error !== '') && (
								<AnimatePresence>
									{errors.email.length ? (
										<ErrorDiv pos={'absolute'} key="modal5">
											{errors.email}
										</ErrorDiv>
									) : errors.password ? (
										<ErrorDiv pos={'absolute'} key="modal6">
											{errors.password}
										</ErrorDiv>
									) : errors.name ? (
										<ErrorDiv pos={'absolute'} key="modal7">
											{errors.name}
										</ErrorDiv>
									) : null}
								</AnimatePresence>
							)}
						</div>
					</Box>
				</Flex>
			</Layout>
		);
	return <SuccessDiv>{success}</SuccessDiv>;
};

export default MyAccount;
