import { Perk } from '../models/perk.model';
import { PerkEndpoint } from '../schemas/perk.schema';

export function PerkEndpointToModel(perkEndpoint: PerkEndpoint) {
	return Perk.create({ ...perkEndpoint, ...perkEndpoint.attributes });
}
