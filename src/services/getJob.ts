import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Datum } from '../models';
// import { Job } from '../models/job.model';

export const getJob = async (id: string): Promise<Datum> => {
	const jobDoc = await getDoc(doc(db, 'jobs/' + id));
	if (!jobDoc.exists()) throw new Error('Document not exist');
	const data = jobDoc.data() as Datum;
	return data;
};

