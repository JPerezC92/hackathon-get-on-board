import { motion } from 'framer-motion';
import { modalError } from '../../utilities/';
import './Modals.css';
const ErrorDiv = ({ children, pos }: { children: React.ReactNode, pos?:string}) => {
	return (
		<motion.div	
			className={`errorDiv ${pos==='absolute' ? 'posAbsolute' : ''}`}
			key={'modal'}
			variants={modalError}
			initial="initialState"
			animate="animateState"
			exit="exitState"
		>
			{children}
		</motion.div>
	);
};

export default ErrorDiv;
