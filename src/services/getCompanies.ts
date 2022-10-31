import axios from 'axios';
import { Companies } from '../models';

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
