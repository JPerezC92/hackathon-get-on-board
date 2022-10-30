import { Meta } from './meta.model';

export interface Categories {
	data: Data[];
	meta: Meta;
}

interface Attributes {
	name: string;
	dimension: string;
}

interface Data {
	id: string;
	type: string;
	attributes: Attributes;
}
