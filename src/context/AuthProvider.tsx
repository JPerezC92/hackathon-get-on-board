import { ReactNode, useEffect, useState, useContext, createContext } from 'react';
import { auth } from '../firebase';
import {
	Auth,
	UserCredential,
	User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth';
import { createUserJob } from '../services/createUserJob';

export interface AuthProviderProps {
	children?: ReactNode;
}

export interface UserContextState {
	isAuthenticated: boolean;
	isLoading: boolean;
	id?: string;
}

export const UserStateContext = createContext<UserContextState>({} as UserContextState);

export interface AuthContextModel {
	auth: Auth;
	user: User | null | undefined;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	signUp: (email: string, password: string) => Promise<UserCredential>;
	sendPasswordResetEmail?: (email: string) => Promise<void>;
	resetPassword: (password: string) => Promise<void>;
	changeEmail: (email: string) => Promise<void> | boolean;
	changePassword: (password: string) => Promise<void> | boolean;
	changeName: (name: string) => Promise<void> | boolean;
}

export const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

export function useAuth(): AuthContextModel {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
	const [user, setUser] = useState<User | null>();

	function signUp(email: string, password: string): Promise<UserCredential> {
		return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
			const userId = userCredential.user?.uid;
			createUserJob(userId);
			return userCredential;
		});
	}

	function signIn(email: string, password: string): Promise<UserCredential> {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function resetPassword(email: string): Promise<void> {
		return sendPasswordResetEmail(auth, email);
	}
	function changeEmail(email: string): Promise<void> | boolean {
		if (user) return updateEmail(user, email);
		return false;
	}
	function changePassword(password: string): Promise<void> | boolean {
		if (user) return updatePassword(user, password);
		return false;
	}
	function changeName(name: string): Promise<void> | boolean {
		if (user) return updateProfile(user, { displayName: name });
		return false;
	}
	useEffect(() => {
		const userStatus = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return userStatus;
	}, []);

	const values = {
		signUp,
		user,
		signIn,
		resetPassword,
		auth,
		changeEmail,
		changePassword,
		changeName,
	};
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUserContext = (): UserContextState => {
	return useContext(UserStateContext);
};
