import { BiReset } from 'react-icons/bi';
import { RiErrorWarningLine, RiEditCircleLine } from 'react-icons/ri';
import { UpdateAccountForm } from './MyAccount';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Tooltip } from '@chakra-ui/react';

interface MyAccountLabelsProps {
	userData: UpdateAccountForm;
	errors: UpdateAccountForm;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleInputReset: (target: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<any>;
	user: User | null | undefined;
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
		}, 100);
	}, []);

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
						<Tooltip label="Rehacer" aria-label="A tooltip">
							<span>
								<BiReset style={{ cursor: 'pointer' }} />
							</span>
						</Tooltip>
					) : (
						<Tooltip label="Modificar" aria-label="A tooltip">
							<span>
								<RiEditCircleLine style={{ fontSize: '1.65rem' }} />
							</span>
						</Tooltip>
					)
				) : userData[labelType] ? (
					<Tooltip label="Rehacer" aria-label="A tooltip">
						<span>
							<BiReset style={{ cursor: 'pointer' }} />
						</span>
					</Tooltip>
				) : ((user && placeHolders && user[placeHolders]) as string) ? (
					<Tooltip label="Modificar" aria-label="A tooltip">
						<span>
							<RiEditCircleLine style={{ fontSize: '1.65rem' }} />
						</span>
					</Tooltip>
				) : (
					<Tooltip label="Crear" aria-label="A tooltip">
						<span>
							<RiErrorWarningLine />
						</span>
					</Tooltip>
				)}
			</button>
		</label>
	);
};

export default MyAccountLabels;
