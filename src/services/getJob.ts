import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Datum } from '../models';
// import { Job } from '../models/job.model';

export const getJob = async (userId: string, jobId: string): Promise<Datum> => {
	const jobDoc = await getDoc(doc(db, 'userJobs', userId, 'jobs', jobId));
	if (!jobDoc.exists()) throw new Error('Document not exist');
	const data = jobDoc.data() as Datum;
	return data;
};

