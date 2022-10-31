import { Category } from '../models/category.model';
import { CategoryEndpoint } from '../schemas/CategoryEndpoint.schema';

export const CategoryEndpointToModel = (categoryEndpoint: CategoryEndpoint): Category => {
	return Category.create({ ...categoryEndpoint, ...categoryEndpoint.attributes });
};
