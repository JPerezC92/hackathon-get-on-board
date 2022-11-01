import { z } from 'zod';
import { MetaSchema } from './meta.schema';
import { TagEndpointSchema } from './tagEndpoint.schema';

export const TagListEndpointSchema = z.object({
	data: z.array(TagEndpointSchema),
	meta: MetaSchema,
});
