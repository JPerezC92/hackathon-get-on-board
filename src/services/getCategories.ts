import axios from 'axios';
import { Categories } from '../models';
import { JobEndpoint } from '../models/jobs.model';

export const getCategories = async (abortSignal?: AbortSignal) => {
	const response = await axios(
		// `${import.meta.env.VITE_API_GETONBOARD_CATEGORIES}${params}`
		'https://www.getonbrd.com/api/v0/categories',
		{ signal: abortSignal },
	);

	const data = await response.data;

	const categories: Categories = data;
	return categories;
};

export const getJobsCategories = async (query: string, perPage: number, page: number) => {
	const response = await axios(
		// `${import.meta.env.VITE_API_GETONBOARD_CATEGORIES}${params}`
		`https://www.getonbrd.com/api/v0/categories/${query
			.toLowerCase()
			.trim()}/jobs?per_page=${perPage}&page=${page}&expand=["company"]`,
	);

	const data = await response.data;
	return data;
};

export const searchCategory = async (category: string, abortSignal?: AbortSignal): Promise<JobEndpoint[]> => {
	const response = await axios(
		`https://www.getonbrd.com/api/v0/categories/${category
			.trim()
			.toLowerCase()}/jobs?per_page=10&page=1&expand=["company"]`,
		{
			signal: abortSignal,
		},
	);

	return (await response.data.data) as JobEndpoint[];
};
