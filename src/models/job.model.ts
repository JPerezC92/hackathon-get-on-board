import { Seniority } from '@/models/seniority.model';
import { Tag } from '@/models/tag.model.';
import { Company } from './company.model';

interface JobProps {
	id: string;
	type: string;
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
	remote_zone: string | null;
	country: string;
	lang: string;
	category_name: string;
	perks: string[];
	min_salary: number | null;
	max_salary: number | null;
	published_at: number;
	response_time_in_days_min: number | null;
	response_time_in_days_max: number | null;
	company: Company;
	modality: string;
	applications_count: number;
	tagList: Tag[];
	seniority: Seniority;
}

export class Job {
	readonly id: string;
	readonly type: string;
	readonly title: string;
	readonly description_headline: string;
	readonly description: string;
	readonly projects: string;
	readonly functions_headline: string;
	readonly functions: string;
	readonly benefits_headline: string;
	readonly benefits: string;
	readonly desirable_headline: string;
	readonly desirable: string;
	readonly remote: boolean;
	readonly remote_modality: string;
	readonly remote_zone: string | null;
	readonly country: string;
	readonly lang: string;
	readonly category_name: string;
	readonly perks: string[];
	readonly min_salary: number | null;
	readonly max_salary: number | null;
	readonly published_at: number;
	readonly response_time_in_days_min: number | null;
	readonly response_time_in_days_max: number | null;
	readonly company: Company;
	readonly modality: string;
	readonly applications_count: number;
	readonly tagList: Tag[];
	readonly seniority: Seniority;

	constructor(props: JobProps) {
		this.id = props.id;
		this.type = props.type;
		this.title = props.title;
		this.description_headline = props.description_headline;
		this.description = props.description;
		this.projects = props.projects;
		this.functions_headline = props.functions_headline;
		this.functions = props.functions;
		this.benefits_headline = props.benefits_headline;
		this.benefits = props.benefits;
		this.desirable_headline = props.desirable_headline;
		this.desirable = props.desirable;
		this.remote = props.remote;
		this.remote_modality = props.remote_modality;
		this.remote_zone = props.remote_zone;
		this.country = props.country;
		this.lang = props.lang;
		this.category_name = props.category_name;
		this.perks = props.perks;
		this.min_salary = props.min_salary;
		this.max_salary = props.max_salary;
		this.published_at = props.published_at;
		this.response_time_in_days_min = props.response_time_in_days_min;
		this.response_time_in_days_max = props.response_time_in_days_max;
		this.company = props.company;
		this.modality = props.modality;
		this.applications_count = props.applications_count;
		this.tagList = props.tagList;
		this.seniority = props.seniority;
	}

	static create(jobProps: JobProps): Job {
		return new Job(jobProps);
	}
}
