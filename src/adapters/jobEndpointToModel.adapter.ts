import { Job } from '../models/job.model';
import { JobEndpoint } from '../schemas/jobEndpoint.schema';
import { CompanyEndpointToModel } from './companyEndpointToModel.adapter';

export const JobEndpointToModel = (jobEndpoint: JobEndpoint): Job => {
	return Job.create({
		...jobEndpoint,
		...jobEndpoint.attributes,
		response_time_in_days_min: jobEndpoint?.attributes?.response_time_in_days.min,
		response_time_in_days_max: jobEndpoint?.attributes?.response_time_in_days.max,
		company: CompanyEndpointToModel({ ...jobEndpoint.attributes.company.data }),
		modality: jobEndpoint.attributes.modality.data.attributes.name,
	});
};
