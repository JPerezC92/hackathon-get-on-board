export interface JobEndpoint {
	id: string;
	type: string;
	attributes: Jobttributes;
	links: Links;
}

interface Links {
	public_url: string;
}

interface Jobttributes {
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
	min_salary?: number;
	max_salary?: number;
	published_at: number;
	response_time_in_days: Responsetimeindays;
	applications_count: number;
	tenant_city?: Tenantcity;
	modality: Tenantcity;
	seniority: Tenantcity;
	tags: Tags;
	company: Company;
}

interface Company {
	data: CompanyData;
}

interface CompanyData {
	id: string;
	type: string;
	attributes: CompanyAttributes;
}

interface CompanyAttributes {
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
	response_time_in_days: Responsetimeindays;
	logo: string;
}

interface Tags {
	data: Data[];
}

interface Tenantcity {
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
