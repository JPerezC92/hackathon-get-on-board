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
	apply: '/apply',
	jobsApplied: '/applied',
	jobsId: (jobId: Job['id']) => `'/jobs'/${jobId}`,
};
