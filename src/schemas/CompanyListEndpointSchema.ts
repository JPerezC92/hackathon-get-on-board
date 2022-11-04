import z from 'zod';
import { MetaSchema } from './meta.schema';
import { CompanyEndpointSchema } from './companyEndpoint.schema';

export const CompanyListEndpointSchema = z.object({
	data: z.array(CompanyEndpointSchema),
	meta: MetaSchema,
});
