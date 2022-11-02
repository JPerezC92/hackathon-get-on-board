import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Datum } from '../models';
import { getJob } from './getJob';

export const createJob = async (data: Datum) => {
	const ref = doc(db, 'jobs/' + data.id);
	const jobDoc = await getDoc(ref);
	if (jobDoc.exists()) throw new Error('Document already exist');

	await setDoc(ref, data);
	const docData = await getJob(data.id);
	return docData;
};

