import { z } from 'zod';
import { CityEndpointSchema } from './city.schema';
import { MetaSchema } from './meta.schema';

export const CityListEndpointSchema = z.object({ data: z.array(CityEndpointSchema), meta: MetaSchema });
