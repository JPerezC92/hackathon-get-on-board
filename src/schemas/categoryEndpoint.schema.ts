import z from 'zod';

export type CategoryAttributes = z.infer<typeof CategoryAttributesSchema>;

export const CategoryAttributesSchema = z.object({
	name: z.string(),
	dimension: z.string(),
});

export const CategoryEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: CategoryAttributesSchema,
});

export type CategoryEndpoint = z.infer<typeof CategoryEndpointSchema>;
