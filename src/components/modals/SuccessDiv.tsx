import './Modals.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const SuccessDiv = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	return (
		<div className="successDivContainer" onClick={() => navigate('/')}>
			<div className="successDiv">
				<p>{children}</p>
			</div>
		</div>
	);
};

export default SuccessDiv;
