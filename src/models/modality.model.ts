interface ModalityProps {
	id: string;
	type: string;
	name: string;
	locale_key: string;
}

export class Modality {
	readonly id: string;
	readonly type: string;
	readonly name: string;
	readonly locale_key: string;

	constructor(modalityProps: ModalityProps) {
		this.id = modalityProps.id;
		this.name = modalityProps.name;
		this.type = modalityProps.type;
		this.locale_key = modalityProps.locale_key;
	}

	static create(modalityProps: ModalityProps) {
		return new Modality(modalityProps);
	}
}
