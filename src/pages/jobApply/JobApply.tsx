import './JobApply.css';
import { LSKeys } from '../../utilities/localStorageKeys';
import { Datum } from '../../models';
import { createJob } from '../../services';
import { useAuth } from '../../context/AuthProvider';
import { Job } from '@/models/job.model';

const JobApply = () => {
	// const jobStoraged = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Datum;
	const jobStoraged = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Job;
	const tittle = jobStoraged?.title;
	const company = jobStoraged?.company.name;

	const { user } = useAuth();
	const userId = user?.uid;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		userId && createJob(jobStoraged, userId);
	};

	return (
		<div className="jobApplyContainer">
			<div className="jobApplyHead">
				<h1>{tittle}</h1>
				<h2>{company}</h2>
			</div>
			<form className="jobApplyForm" onSubmit={handleSubmit}>
				<label htmlFor="salary">Salario deseado</label>
				<input type="text" name="salary" id="salary" />
				<label htmlFor="why">Por que deseas trabajar con nosotros?</label>
				<input type="text" name="why" id="why" />
				<button>Enviar</button>
			</form>
		</div>
	);
};

export default JobApply;
