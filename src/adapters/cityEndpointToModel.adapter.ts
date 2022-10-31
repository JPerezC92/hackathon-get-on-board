import { City } from '../models/city.model';
import { CityEndpoint } from '../schemas/city.schema';

export function CityEndpointToModel(cityEndpoint: CityEndpoint): City {
	return new City({ ...cityEndpoint, ...cityEndpoint.attributes });
}
