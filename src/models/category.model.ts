interface CategoryProps {
	name: string;
	dimension: string;
	id: string;
	type: string;
}

export class Category {
	readonly name: string;
	readonly dimension: string;
	readonly id: string;
	readonly type: string;

	constructor(props: CategoryProps) {
		this.name = props.name;
		this.dimension = props.dimension;
		this.id = props.id;
		this.type = props.type;
	}

	static create(props: CategoryProps) {
		return new Category(props);
	}
}
