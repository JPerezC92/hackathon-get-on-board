import { SeniorityEndpointSchema } from '@/schemas/seniorityEndpoint.schema';
import { TagEndpointSchema } from '@/schemas/tagEndpoint.schema';
import z from 'zod';
import { CompanyEndpointSchema } from './companyEndpoint.schema';
import { ResponseTimeinDaysSchema } from './responseTimeInDays.schema';

const LinksSchema = z.object({
	public_url: z.string(),
});

export type CompanyEndpointData = z.infer<typeof CompanyEndpointSchema>;

const IdentifierDataSchema = z.object({
	id: z.number(),
	type: z.string(),
});

const IdentifierSchema = z.object({
	data: IdentifierDataSchema,
});

const TagsSchema = z.object({
	data: z.array(IdentifierDataSchema),
});

const ModalityEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: z.object({
		name: z.string(),
		locale_key: z.string(),
	}),
});

const JobEndpointAttributesSchema = z.object({
	title: z.string(),
	description_headline: z.string(),
	description: z.string(),
	projects: z.string(),
	functions_headline: z.string(),
	functions: z.string(),
	benefits_headline: z.string(),
	benefits: z.string(),
	desirable_headline: z.string(),
	desirable: z.string(),
	remote: z.boolean(),
	remote_modality: z.string(),
	remote_zone: z.string().nullable(),
	country: z.string(),
	lang: z.string(),
	category_name: z.string(),
	perks: z.array(z.string()),
	min_salary: z.number().nullable(),
	max_salary: z.number().nullable(),
	published_at: z.number(),
	response_time_in_days: ResponseTimeinDaysSchema,
	applications_count: z.number(),
	tenant_city: IdentifierSchema.nullable(),
	modality: z.object({ data: ModalityEndpointSchema }),
	seniority: z.object({ data: SeniorityEndpointSchema }),
	tags: z.object({ data: z.array(TagEndpointSchema) }),
	company: z.object({ data: CompanyEndpointSchema }),
});

export const JobEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: JobEndpointAttributesSchema,
	links: LinksSchema,
});

export type JobEndpoint = z.infer<typeof JobEndpointSchema>;
