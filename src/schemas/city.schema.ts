import { z } from 'zod';

const CityEndpointAttributesSchema = z.object({ name: z.string() });

export const CityEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: CityEndpointAttributesSchema,
});

export type CityEndpoint = z.infer<typeof CityEndpointSchema>;
