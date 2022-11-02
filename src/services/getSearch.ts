import axios from 'axios';
import { JobEndpointToModel } from '../adapters/jobEndpointToModel.adapter';
import { Search } from '../models';
import { JobListEndpointSchema } from '../schemas/josListEndpoint.schema';
import { constant } from '../utilities/constants';

interface GetSearchProps {
	query: string;
	signal?: AbortSignal;
	perPage?: number;
	page?: number;
}

// export const getSearch = async (query: string, perPage: number, page:number) => {
export const getSearch = async ({ query, perPage: perPage = 10, page = 1, signal }: GetSearchProps) => {
	const response = await axios(
		`${constant.API_URL}search/jobs?query=${query}&per_page=${perPage}&page=${page}&expand=["company","modality"]`,
		{ signal },
	);

	const result = await response.data;
	const validatedResult = JobListEndpointSchema.parse(result);
	return { jobs: validatedResult.data.map(JobEndpointToModel), meta: validatedResult.meta };
};
