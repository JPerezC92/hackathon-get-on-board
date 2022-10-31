import { z } from 'zod';

const PerkAttributeEndpointSchema = z.object({
	name: z.string(),
	description: z.string(),
});

export const PerkEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: PerkAttributeEndpointSchema,
});

export type PerkEndpoint = z.infer<typeof PerkEndpointSchema>;
