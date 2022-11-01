import z from 'zod';

export const ResponseTimeinDaysSchema = z.object({
	min: z.number().nullable(),
	max: z.number().nullable(),
});
