import axios from 'axios';
import { CompanyEndpointToModel } from '../adapters/companyEndpointToModel.adapter';
import { JobEndpointToModel } from '../adapters/jobEndpointToModel.adapter';
import { Companies } from '../models';
import { CompanyListEndpointSchema } from '../schemas/CompanyListEndpointSchema';
import { JobListEndpointSchema } from '../schemas/josListEndpoint.schema';

export const getCompanies = async (perPage?: number, page?: number) => {
	let params = '';
	if (perPage && page) {
		params += `per_page=${perPage}&page=${page}`;
	}

	const response = await axios(`${import.meta.env.VITE_API_GETONBOARD_COMPANIES}${params}`);

	const data = await response.data;

	const companies: Companies = data;
	return companies;
};

export const getJobsCompanies = async (company: string, perPage?: number, page?: number) => {
	const response = await axios(
		`https://www.getonbrd.com/api/v0/companies/${company}/jobs?per_page=${perPage}&page=${page}&expand=["company"]`,
	);

	const data = await response.data;
	return data;
};

export const getCompaniesV2 = async (signal?: AbortSignal) => {
	const response = await axios(`https://www.getonbrd.com/api/v0/companies?per_page=10&page=1`, { signal });

	const result = await response.data;

	const validatedResult = CompanyListEndpointSchema.parse(result);
	return validatedResult.data.map(CompanyEndpointToModel);
};

export const getJobsCompaniesV2 = async ({
	company,
	page = 1,
	perPage = 10,
	signal,
}: {
	company: string;
	perPage?: number;
	page?: number;
	signal?: AbortSignal;
}) => {
	const response = await axios(
		`https://www.getonbrd.com/api/v0/companies/${company}/jobs?per_page=${perPage}&page=${page}&expand=["company","modality"]`,
		{ signal },
	);

	const result = response.data;
	const validatedResult = JobListEndpointSchema.parse(result);
	return { jobs: validatedResult.data.map(JobEndpointToModel), meta: validatedResult.meta };
};
