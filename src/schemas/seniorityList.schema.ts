import { z } from 'zod';
import { MetaSchema } from './meta.schema';
import { SeniorityEndpointSchema } from './seniorityEndpoint.schema';

export const SeniorityListEndpointSchema = z.object({
	data: z.array(SeniorityEndpointSchema),
	meta: MetaSchema,
});
