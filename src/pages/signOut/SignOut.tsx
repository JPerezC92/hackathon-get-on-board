import { useAuth } from '../../context/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOut.css'

const SignOut = ({ children }) => {
	const redirect = useNavigate();
	const { auth } = useAuth();

	return (
		<button className='signOutButton'
			onClick={() =>
				auth.signOut().then(() => {
					redirect('/');
				})
			}
		>
			{children}
		</button>
	);
};

export default SignOut;
