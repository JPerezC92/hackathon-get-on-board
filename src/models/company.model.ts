interface CompanyProps {
	id: string;
	type: string;
	name: string;
	description: string;
	long_description: string;
	projects: string;
	benefits: string;
	web: string;
	twitter: string;
	github: string;
	facebook: string;
	angellist: string;
	country: string;
	logo: string;
}

export class Company {
	readonly id: string;
	readonly type: string;
	readonly name: string;
	readonly description: string;
	readonly long_description: string;
	readonly projects: string;
	readonly benefits: string;
	readonly web: string;
	readonly twitter: string;
	readonly github: string;
	readonly facebook: string;
	readonly angellist: string;
	readonly country: string;
	readonly logo: string;

	constructor(companyProps: CompanyProps) {
		this.id = companyProps.id;
		this.type = companyProps.type;
		this.id = companyProps.id;
		this.type = companyProps.type;
		this.name = companyProps.name;
		this.description = companyProps.description;
		this.long_description = companyProps.long_description;
		this.projects = companyProps.projects;
		this.benefits = companyProps.benefits;
		this.web = companyProps.web;
		this.twitter = companyProps.twitter;
		this.github = companyProps.github;
		this.facebook = companyProps.facebook;
		this.angellist = companyProps.angellist;
		this.country = companyProps.country;
		this.logo = companyProps.logo;
	}

	static create(companyProps: CompanyProps): Company {
		return new Company(companyProps);
	}
}
