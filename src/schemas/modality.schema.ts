import { z } from 'zod';

const ModalityEndpointAttributesSchema = z.object({ name: z.string(), locale_key: z.string() });

export const ModalityEndpointSchema = z.object({
	id: z.string(),
	type: z.string(),
	attributes: ModalityEndpointAttributesSchema,
});

export type ModalityEndpoint = z.infer<typeof ModalityEndpointSchema>;
