import { z } from 'zod';

const TagEndpointAttributesSchema = z.object({ name: z.string(), keywords: z.string().nullable() });

export const TagEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: TagEndpointAttributesSchema,
});

export type TagEndpoint = z.infer<typeof TagEndpointSchema>;
