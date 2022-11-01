import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { IUser } from '../models';

export const getUser = async (uid: string): Promise<IUser> => {
	const res = await getDoc(doc(db, 'users/' + uid));
	if (!res.exists()) throw new Error('Document not exist');
	const data = res.data() as IUser;
	return data;
};

