export type LoadingUser = undefined;
export type NotExistUser = null;
export type UserStates = IUser | LoadingUser | NotExistUser;

export interface ICreateUser {
	firstName: string;
	lastName: string;
	avatar?: string;

	email: string;
	password: string;
}

export interface ICreateUserDB extends ICreateUser {
	uid: string;
}

export type IUpdateUser = Partial<Omit<IUser, 'uid'>>;

export interface IUser {
	uid: string;
	firstName: string;
	lastName: string;
	avatar?: string;
	description: string;

	email: string;
}

