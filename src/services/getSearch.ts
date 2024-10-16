import axios from 'axios';
import { JobEndpointToModel } from '../adapters/jobEndpointToModel.adapter';
import { JobListEndpointSchema } from '../schemas/josListEndpoint.schema';
import { constant } from '../utilities/constants';
import { z } from 'zod';

interface GetSearchProps {
	query: string;
	signal?: AbortSignal;
	perPage?: number;
	page?: number;
}

// -----> This type should be remove
type Jobs = z.infer<typeof JobListEndpointSchema>;

export const getSearch = async ({ query, perPage: perPage = 10, page = 1, signal }: GetSearchProps) => {
	const response = await axios(
		`${constant.API_URL}search/jobs?query=${query}&per_page=${perPage}&page=${page}&expand=["company","modality","tags","seniority"]`,
		{ signal },
	);

	const result = (await response.data) as Jobs;

	// -----> JobListEndpointSchema this schema should be fix
	// const validatedResult = JobListEndpointSchema.parse(result);
	return { jobs: result.data.map(JobEndpointToModel), meta: result.meta };
};
