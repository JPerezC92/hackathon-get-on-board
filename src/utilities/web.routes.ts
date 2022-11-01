import { Job } from '../models/job.model';

export const webRoutes = {
	root: '/',
	register: '/register',
	login: '/login',
	jobs: '/jobs',
	disconect: '/disconect',
	profile: '/profile',
	companies: '/companies',
	recover: '/recover',
	jobsId: (jobId: Job['id']) => `'/jobs'/${jobId}`,
};
