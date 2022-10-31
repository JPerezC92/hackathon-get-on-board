import z from 'zod';

export const MetaSchema = z.object({
	page: z.number(),
	per_page: z.number(),
	total_pages: z.number(),
});

export type Meta = z.infer<typeof MetaSchema>;
