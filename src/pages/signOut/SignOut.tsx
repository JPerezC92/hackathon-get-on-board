import { useAuth } from '../../context/AuthProvider';

import { useNavigate } from 'react-router-dom';
import './SignOut.css';
import { Link } from '@chakra-ui/react';

const SignOut = ({ children }: { children: React.ReactNode }) => {
	const redirect = useNavigate();
	const { auth } = useAuth();

	return (
		<Link
			fontWeight="medium"
			py="1"
			px="2"
			color={'secondary.700'}
			textAlign="center"
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
			onClick={() =>
				auth.signOut().then(() => {
					redirect('/');
				})
			}
		>
			{children}
		</Link>
	);
};

export default SignOut;
