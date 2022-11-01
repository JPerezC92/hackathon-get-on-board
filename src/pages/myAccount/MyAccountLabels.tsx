import { BiReset } from 'react-icons/bi';
import { RiErrorWarningLine, RiEditCircleLine } from 'react-icons/ri';

const MyAccountLabels = ({ errors, userData, labelType, handleInputChange, handleInputReset, user }) => {
	const inputType =
		labelType === 'password' ? 'password' : labelType === 'email' ? 'email' : labelType === 'phone' ? 'phone' : 'text';
    const titles = { email: 'Correo electronico', password: 'Contraseña', name: 'Nombre', phone: 'Telefono' };
    
	return (
		<label>
			<span>{titles[labelType]}</span>
			<input
				className={errors[labelType] ? 'error' : ''}
				type={inputType}
				name={labelType}
				value={userData[labelType]}
				onChange={handleInputChange}
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
				) : user?.[labelType] ? (
					<RiEditCircleLine style={{ fontSize: '1.65rem' }} />
				) : (
					<RiErrorWarningLine />
				)}
			</button>
		</label>
	);
};

export default MyAccountLabels;
