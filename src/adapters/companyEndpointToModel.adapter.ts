import { CompanyEndpointData } from '../schemas/jobEndpoint.schema';
import { Company } from './Company';

export const CompanyEndpointToModel = (companyEndpoint: CompanyEndpointData): Company => {
	return Company.create({ ...companyEndpoint, ...companyEndpoint.attributes });
};
