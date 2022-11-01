import z from 'zod';
import { ResponseTimeinDaysSchema } from './responseTimeInDays.schema';

const CompanyAttributesSchema = z.object({
	name: z.string(),
	description: z.string(),
	long_description: z.string(),
	projects: z.string().nullable(),
	benefits: z.string().nullable(),
	web: z.string(),
	twitter: z.string(),
	github: z.string(),
	facebook: z.string(),
	angellist: z.string().nullable(),
	country: z.string(),
	response_time_in_days: ResponseTimeinDaysSchema,
	logo: z.string().nullable(),
});

export const CompanyEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: CompanyAttributesSchema,
});
