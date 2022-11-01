import { Modality } from '../models/modality.model';
import { ModalityEndpoint } from '../schemas/modality.schema';

export function ModalityEndpointToModel(modalityEndpoint: ModalityEndpoint): Modality {
	return new Modality({ ...modalityEndpoint, ...modalityEndpoint.attributes });
}
