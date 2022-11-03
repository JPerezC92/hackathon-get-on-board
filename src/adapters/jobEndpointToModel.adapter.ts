import { SeniorityEndpointToModel } from '@/adapters/seniorityEndpointToModel.adapter';
import { TagEndpointToModel } from '@/adapters/tagEndpointToModel.adapter';
import { Job } from '../models/job.model';
import { JobEndpoint } from '../schemas/jobEndpoint.schema';
import { CompanyEndpointToModel } from './companyEndpointToModel.adapter';

export const JobEndpointToModel = (jobEndpoint: JobEndpoint): Job => {
	return Job.create({
		...jobEndpoint,
		...jobEndpoint.attributes,

		tagList: jobEndpoint.attributes.tags.data.map((v) => TagEndpointToModel({ ...v })),
		seniority: SeniorityEndpointToModel(jobEndpoint.attributes.seniority.data),
		response_time_in_days_min: jobEndpoint?.attributes?.response_time_in_days.min,
		response_time_in_days_max: jobEndpoint?.attributes?.response_time_in_days.max,
		company: CompanyEndpointToModel({ ...jobEndpoint.attributes.company.data }),
		modality: jobEndpoint.attributes.modality.data.attributes.name,
	});
};
