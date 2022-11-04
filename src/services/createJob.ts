import { Job } from '@/models/job.model';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const createJob = async (data: Job, userId: string) => {
	const ref = doc(db, 'userJobs', userId, 'jobs', data.id);
	const jobDoc = await getDoc(ref);
	if (jobDoc.exists()) throw new Error('Document already exist');

	await setDoc(ref, data);
};
