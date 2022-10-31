import { Job } from '../models/Job';

export const webRoutes = {
	root: '/',
	register: '/register',
	login: '/login',
	jobs: '/jobs',
	companies: '/companies',
	jobsId: (jobId: Job['id']) => `'/jobs'/${jobId}`,
};
