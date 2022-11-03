import { Job } from '@/models/job.model';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { Datum } from '../../models';
import { getJobs } from '../../services/getJobs';
import { LSKeys } from '../../utilities/localStorageKeys';

const JobsApplied = () => {
	const [jobs, setJobs] = useState<Array<Job>>([]);
	const { user } = useAuth();
	const userId = user?.uid;

	useEffect(() => {
		if (userId)
			getJobs(userId).then((data) => {
				setJobs(data);
			});
	}, [userId]);

	const navigate = useNavigate();

	const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { className } = e.target as HTMLButtonElement;
		const index = Number(className);
		window.localStorage.setItem(LSKeys.jobDetail, JSON.stringify(jobs[index]));
		navigate('/jobs/' + jobs[index].id);
	};

	return (
		<div>
			{jobs?.map((job, index) => (
				<div key={job.id}>
					<button className={`${index}`} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOnClick(e)}>
						{job.title}
					</button>
				</div>
			))}
		</div>
	);
};

export default JobsApplied;
