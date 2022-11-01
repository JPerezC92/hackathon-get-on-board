import z from 'zod';
import { CategoryEndpointSchema } from './CategoryEndpoint.schema';
import { MetaSchema } from './meta.schema';

export const CategoryListEndpointSchema = z.object({
	data: z.array(CategoryEndpointSchema),
	meta: MetaSchema,
});

export type CategoryListEndpoint = z.infer<typeof CategoryListEndpointSchema>;
