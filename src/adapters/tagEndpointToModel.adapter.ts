import { Tag } from '../models/tag.model.';
import { TagEndpoint } from '../schemas/tagEndpoint.schema';

export function TagEndpointToModel(tagEndpoint: TagEndpoint): Tag {
	return new Tag({ ...tagEndpoint, ...tagEndpoint.attributes });
}
