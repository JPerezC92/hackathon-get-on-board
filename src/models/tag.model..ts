interface TagProps {
	id: string;
	type: string;
	name: string;
	keywords: string | null;
}

export class Tag {
	readonly id: string;
	readonly type: string;
	readonly name: string;
	readonly keywords: string | null;

	constructor(tagProps: TagProps) {
		this.id = tagProps.id;
		this.name = tagProps.name;
		this.type = tagProps.type;
		this.keywords = tagProps.keywords;
	}

	static create(tagProps: TagProps) {
		return new Tag(tagProps);
	}
}
