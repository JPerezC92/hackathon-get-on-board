import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Datum } from '../models';
// import { Job } from '../models/job.model';

export const getJobs = async (userId: string): Promise<Array<Datum>> => {
	const jobsQuery = query(collection(db, 'userJobs', userId, 'jobs'));
    const jobsSnapshot = await getDocs(jobsQuery);
    const jobs: Array<Datum> = [];
    jobsSnapshot.forEach((doc) => {
        jobs.push(doc.data() as Datum);
    });
    return jobs;
};

