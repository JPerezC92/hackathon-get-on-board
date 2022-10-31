interface CityProps {
	id: string;
	type: string;
	name: string;
}

export class City {
	id: string;
	type: string;
	name: string;

	constructor(cityProps: CityProps) {
		this.id = cityProps.id;
		this.name = cityProps.name;
		this.type = cityProps.type;
	}

	static create(cityProps: CityProps) {
		return new City(cityProps);
	}
}
