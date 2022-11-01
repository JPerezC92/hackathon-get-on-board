interface PerkProps {
	id: string;
	type: string;
	name: string;
	description: string;
}

export class Perk {
	id: string;
	type: string;
	name: string;
	description: string;

	constructor(perkProps: PerkProps) {
		this.id = perkProps.id;
		this.description = perkProps.description;
		this.name = perkProps.name;
		this.type = perkProps.type;
	}

	static create(perkProps: PerkProps) {
		return new Perk(perkProps);
	}
}
