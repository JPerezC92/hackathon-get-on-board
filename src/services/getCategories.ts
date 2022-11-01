import axios from 'axios';

import { CategoryEndpointToModel } from '../adapters/categoryEndpointToModel.adapter';
import { JobEndpointToModel } from '../adapters/jobEndpointToModel.adapter';
import { Category } from '../models/category.model';

import { CategoryListEndpointSchema } from '../schemas/categoryListEndpoint.schema';
import { JobListEndpointSchema } from '../schemas/josListEndpoint.schema';

export const getCategories = async (abortSignal?: AbortSignal): Promise<Category[]> => {
	const response = await axios(
		// `${import.meta.env.VITE_API_GETONBOARD_CATEGORIES}${params}`
		'https://www.getonbrd.com/api/v0/categories',
		{ signal: abortSignal },
	);
	const result = await response.data;
	const validatedResult = CategoryListEndpointSchema.parse(result);
	return validatedResult.data.map(CategoryEndpointToModel);
};

export const getJobsCategories = async (query: string, perPage: number, page: number) => {
	const response = await axios(
		// `${import.meta.env.VITE_API_GETONBOARD_CATEGORIES}${params}`
		`https://www.getonbrd.com/api/v0/categories/${query
			.toLowerCase()
			.trim()}/jobs?per_page=${perPage}&page=${page}&expand=["company","modality"]`,
	);

	const result = await response.data;
	return result;
	// const validatedResult = JobListEndpointSchema.parse(result);
	// return validatedResult.data.map(JobEndpointToModel);
};

// export const searchCategory = async (category: string, abortSignal?: AbortSignal): Promise<JobEndpoint[]> => {
// 	const response = await axios(
// 		`https://www.getonbrd.com/api/v0/categories/${category
// 			.trim()
// 			.toLowerCase()}/jobs?per_page=10&page=1&expand=["company","modality"]`,
// 		{
// 			signal: abortSignal,
// 		},
// 	);

// 	return (await response.data.data) as JobEndpoint[];
// };
