export interface JobEndpoint {
	id: string;
	type: string;
	attributes: Attributes2;
	links: Links;
}

interface Links {
	public_url: string;
}

interface Attributes2 {
	title: string;
	description_headline: string;
	functions_headline: string;
	functions: string;
	benefits_headline: string;
	benefits: string;
	desirable_headline: string;
	desirable: string;
	remote: boolean;
	remote_modality: string;
	remote_zone?: string;
	country: string;
	category_name: string;
	perks: string[];
	min_salary: number;
	max_salary: number;
	modality: string;
	seniority: string;
	published_at: number;
	company: Company;
}

interface Company {
	data: Data;
}

interface Data {
	id: string;
	type: string;
	attributes: Attributes;
	relationships: Relationships;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Relationships {}

interface Attributes {
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
	logo: Logo;
	country: string;
}

interface Logo {
	url: string;
	thumb: Thumb;
}

interface Thumb {
	url: string;
}
