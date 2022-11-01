import { z } from 'zod';
import { JobEndpointSchema } from './jobEndpoint.schema';
import { MetaSchema } from './meta.schema';

export const JobListEndpointSchema = z.object({
	data: z.array(JobEndpointSchema),
	meta: MetaSchema,
});
