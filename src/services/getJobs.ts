import { Job } from '@/models/job.model';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
// import { Job } from '../models/job.model';

export const getJobs = async (userId: string): Promise<Array<Job>> => {
	const jobsQuery = query(collection(db, 'userJobs', userId, 'jobs'));
	const jobsSnapshot = await getDocs(jobsQuery);
	const jobs: Array<Job> = [];
	jobsSnapshot.forEach((doc) => {
		jobs.push(doc.data() as Job);
	});
	return jobs;
};
