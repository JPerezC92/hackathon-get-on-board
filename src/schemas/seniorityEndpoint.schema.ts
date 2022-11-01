import { z } from 'zod';

const SeniorityEndpointAttributesSchema = z.object({ name: z.string(), locale_key: z.string() });

export const SeniorityEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: SeniorityEndpointAttributesSchema,
});

export type SeniorityEndpoint = z.infer<typeof SeniorityEndpointSchema>;
