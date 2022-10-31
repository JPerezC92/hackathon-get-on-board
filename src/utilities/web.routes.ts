import { Job } from 'src/models/Job';

export const webRoutes = {
	root: '/',
	register: '/register',
	login: '/login',
	jobs: '/jobs',
	jobsId: (jobId: Job['id']) => `'/jobs'/${jobId}`,
};
