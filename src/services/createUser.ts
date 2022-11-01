import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ICreateUserDB, IUser } from '../models';
import { getUser } from './getUser';

export const createUser = async (data: ICreateUserDB): Promise<IUser> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _password, uid, ...user } = data;
	await setDoc(doc(db, 'users/' + data.uid), {
		...user,
		id: uid,
	});
	const res = await getUser(uid);
	return res;
};

