import { Meta } from './meta.model';

export interface CompaniesJobs {
	data: Datum[];
	meta: Meta;
}

interface Datum {
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
	description: string;
	projects: string;
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
	lang: string;
	category_name: string;
	perks: string[];
	min_salary: number;
	max_salary: number;
	published_at: number;
	response_time_in_days: Responsetimeindays;
	applications_count: number;
	tenant_city?: any;
	modality: Modality;
	seniority: Modality;
	tags: Tags;
	company: Company;
}

interface Company {
	data: Data2;
}

interface Data2 {
	id: string;
	type: string;
	attributes: Attributes;
}

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
	country: string;
	response_time_in_days: Responsetimeindays2;
	logo: string;
}

interface Responsetimeindays2 {
	min: number;
	max: number;
}

interface Tags {
	data: Data[];
}

interface Modality {
	data: Data;
}

interface Data {
	id: number;
	type: string;
}

interface Responsetimeindays {
	min?: number;
	max?: number;
}
