interface SeniorityProps {
	id: string;
	type: string;
	name: string;
	locale_key: string;
}

export class Seniority {
	readonly id: string;
	readonly type: string;
	readonly name: string;
	readonly locale_key: string;

	constructor(seniorityProps: SeniorityProps) {
		this.id = seniorityProps.id;
		this.name = seniorityProps.name;
		this.type = seniorityProps.type;
		this.locale_key = seniorityProps.locale_key;
	}

	static create(seniorityProps: SeniorityProps) {
		return new Seniority(seniorityProps);
	}
}
