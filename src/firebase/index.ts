// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithEmailAndPassword as loginWithEmailAndPassword,
	signInWithPopup as loginWithPopup,
	signOut as logOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ICreateUser, IUser } from '../models';
import { getUser, createUser } from '../services';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
	authDomain: 'hackajob-76be9.firebaseapp.com',
	projectId: 'hackajob-76be9',
	storageBucket: 'hackajob-76be9.appspot.com',
	messagingSenderId: '133658437122',
	appId: '1:133658437122:web:749bb2e64a1d2491d1e91b',
	measurementId: 'G-0K45EDQGQR',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// Auth methods
export const singInWithEmailAndPassword = async (email: string, password: string) => {
	const res = await loginWithEmailAndPassword(auth, email, password);
	const user = getUser(res.user.uid);
	return user;
};

export const singInWithGoogle = async (): Promise<IUser> => {
	const res = await loginWithPopup(auth, googleProvider);
	const user = getUser(res.user.uid);
	return user;
};

export const registerWithEmailAndPassword = async (data: ICreateUser): Promise<IUser> => {
	const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
	const user = await createUser({ ...data, uid: res.user.uid });
	return user;
};

export const singOut = async () => {
	await logOut(auth);
};

export const sendPasswordReset = async (email: string) => {
	await sendPasswordResetEmail(auth, email);
};

