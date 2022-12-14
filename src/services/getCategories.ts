import axios from 'axios';

import { CategoryEndpointToModel } from '../adapters/categoryEndpointToModel.adapter';
import { JobEndpointToModel } from '../adapters/jobEndpointToModel.adapter';
import { Category } from '../models/category.model';

import { CategoryListEndpointSchema } from '../schemas/categoryListEndpoint.schema';
import { JobListEndpointSchema } from '../schemas/josListEndpoint.schema';
import { constant } from '../utilities/constants';

export const getCategories = async (abortSignal?: AbortSignal): Promise<Category[]> => {
	const response = await axios(`${constant.API_URL}categories`, { signal: abortSignal });
	const result = await response.data;
	const validatedResult = CategoryListEndpointSchema.parse(result);
	return validatedResult.data.map(CategoryEndpointToModel);
};

export const getJobsCategories = async (query: string, perPage: number, page: number) => {
	const response = await axios(
		`${constant.API_URL}categories/${query
			.toLowerCase()
			.trim()}/jobs?per_page=${perPage}&page=${page}&expand=["company","modality","tags"]`,
	);

	const result = await response.data;
	return result;
};

export const getJobsCategoriesV2 = async ({
	page = 1,
	perPage = 10,
	query,
	signal,
}: {
	query: string;
	perPage?: number;
	page?: number;
	signal?: AbortSignal;
}) => {
	const result = await axios(
		`${constant.API_URL}categories/${query
			.toLowerCase()
			.trim()}/jobs?per_page=${perPage}&page=${page}&expand=["company","modality","tags","seniority"]`,
		{ signal },
	);

	const validatedResult = JobListEndpointSchema.parse(result.data);
	return { jobs: validatedResult.data.map(JobEndpointToModel), meta: validatedResult.meta };
};
