import { z } from 'zod';
import { MetaSchema } from './meta.schema';
import { ModalityEndpointSchema } from './modality.schema';

export const ModalityListEndpointSchema = z.object({
	data: z.array(ModalityEndpointSchema),
	meta: MetaSchema,
});
