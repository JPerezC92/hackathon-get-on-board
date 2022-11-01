import { Seniority } from '../models/seniority.model';
import { SeniorityEndpoint } from '../schemas/seniorityEndpoint.schema';

export function SeniorityEndpointToModel(seniorityEndpoint: SeniorityEndpoint): Seniority {
	return new Seniority({ ...seniorityEndpoint, ...seniorityEndpoint.attributes });
}
