import z from 'zod';

const LinksSchema = z.object({
	public_url: z.string(),
});

type Links = z.infer<typeof LinksSchema>;

const ResponsetimeindaysSchema = z.object({
	min: z.number().nullable(),
	max: z.number().nullable(),
});

type Responsetimeindays = z.infer<typeof ResponsetimeindaysSchema>;

const CompanyAttributesSchema = z.object({
	name: z.string(),
	description: z.string(),
	long_description: z.string(),
	projects: z.string(),
	benefits: z.string(),
	web: z.string(),
	twitter: z.string(),
	github: z.string(),
	facebook: z.string(),
	angellist: z.string(),
	country: z.string(),
	response_time_in_days: ResponsetimeindaysSchema,
	logo: z.string(),
});

type CompanyAttributes = z.infer<typeof CompanyAttributesSchema>;
const CompanyEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: CompanyAttributesSchema,
});

export type CompanyEndpointData = z.infer<typeof CompanyEndpointSchema>;

const IdentifierDataSchema = z.object({
	id: z.number(),
	type: z.string(),
});

const IdentifierSchema = z.object({
	data: IdentifierDataSchema,
});

type Identifier = z.infer<typeof IdentifierSchema>;

type IdentifierData = z.infer<typeof IdentifierDataSchema>;

const TagsSchema = z.object({
	data: z.array(IdentifierDataSchema),
});
type Tags = z.infer<typeof TagsSchema>;

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
	response_time_in_days: ResponsetimeindaysSchema,
	applications_count: z.number(),
	tenant_city: IdentifierSchema.nullable(),
	modality: z.object({ data: ModalityEndpointSchema }),
	seniority: IdentifierSchema,
	tags: TagsSchema,
	company: z.object({ data: CompanyEndpointSchema }),
});

type JobEndpointAttributes = z.infer<typeof JobEndpointAttributesSchema>;

export const JobEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: JobEndpointAttributesSchema,
	links: LinksSchema,
});

export type JobEndpoint = z.infer<typeof JobEndpointSchema>;
