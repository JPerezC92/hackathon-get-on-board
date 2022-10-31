import { CompanyEndpointData } from '../schemas/jobEndpoint.schema';
import { Company } from '../models/company.model';

export const CompanyEndpointToModel = (companyEndpoint: CompanyEndpointData): Company => {
	return Company.create({ ...companyEndpoint, ...companyEndpoint.attributes });
};
