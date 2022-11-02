import { BiReset } from 'react-icons/bi';
import { RiErrorWarningLine, RiEditCircleLine } from 'react-icons/ri';
import { UpdateAccountForm } from './MyAccount';
import {useState, useEffect } from 'react';
import { User } from 'firebase/auth';

interface MyAccountLabelsProps {
	userData: UpdateAccountForm;
	errors: UpdateAccountForm;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleInputReset: (target: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<any>;
	user: User | null;
	labelType: keyof UpdateAccountForm;
}

const MyAccountLabels = ({
	errors,
	userData,
	labelType,
	handleInputChange,
	handleInputReset,
	user,
}: MyAccountLabelsProps) => {
	const [ready, setReady] = useState(false);
	const inputType =
		labelType === 'password' ? 'password' : labelType === 'email' ? 'email' : labelType === 'phone' ? 'phone' : 'text';
	const placeHolders =
		labelType === 'email' ? 'email' : labelType === 'phone' ? 'phoneNumber' : labelType === 'name' ? 'displayName' : '';
	const titles: Record<string, string> = {
		email: 'Correo electronico',
		password: 'Contraseña',
		name: 'Nombre',
		phone: 'Telefono',
	};

		

	useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 100);},[])

	return (
		<label>
			<span>{titles[labelType]}</span>
			<input
				className={errors[labelType] ? 'error' : ''}
				type={inputType}
				name={labelType}
				value={userData[labelType]}
				onChange={handleInputChange}
				placeholder={(user && placeHolders && user[placeHolders]) as string}
				disabled={!ready}
			/>

			<button type="button" className="resetBtn" onClick={() => handleInputReset(labelType)}>
				{''}
				{labelType === 'password' ? (
					userData[labelType] ? (
						<BiReset style={{ cursor: 'pointer' }} />
					) : (
						<RiEditCircleLine style={{ fontSize: '1.65rem' }} />
					)
				) : userData[labelType] ? (
					<BiReset style={{ cursor: 'pointer' }} />
				) : ((user && placeHolders && user[placeHolders]) as string) ? (
					<RiEditCircleLine style={{ fontSize: '1.65rem' }} />
				) : (
					<RiErrorWarningLine />
				)}
			</button>
		</label>
	);
};

export default MyAccountLabels;
