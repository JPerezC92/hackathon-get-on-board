import './Modals.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { LSKeys } from '@/utilities/localStorageKeys';
import { Job } from '@/models/job.model';

const SuccessDiv = ({ children, applying }: { children: React.ReactNode, applying:boolean }) => {

	const clickHandler = () => {
	if(applying){
	const {id} = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Job;
		navigate(`/jobsV2/${id}`);
		return false;}
		navigate('/');

	};



	const navigate = useNavigate();
	 return (
		<div className="successDivContainer" onClick={clickHandler}>
			<div className={`successDiv ${applying ? 'transp' : ''}`}>
				<p>{children}</p>
			</div>
		</div>
	);};

export default SuccessDiv;
