import axios from 'axios';
import { Technologies } from '../models';

export const getTechnologies = async (perPage?: number, page?: number) => {
	let params = '';
	if (perPage && page) {
		params += `per_page=${perPage}&page=${page}`;
	}

	const response = await axios(`${import.meta.env.VITE_API_GETONBOARD_TECHNOLOGIES}${params}`);

	const data = await response.data;

	const technologies: Technologies = data;
	return technologies;
};
