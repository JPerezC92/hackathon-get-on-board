export interface ICreateUser {
	firstName?: string;
	lastName?: string;
	avatar?: string;

	email: string;
	password: string;
}

export interface IUser {
	// For other features
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

