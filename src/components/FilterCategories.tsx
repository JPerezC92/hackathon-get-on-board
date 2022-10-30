import { Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Categories } from '../models';
import { getCategories, searchCategory } from '../services';

export const FilterCategories = () => {
	const [category, setCategory] = React.useState('');

	const { data: categoriesList } = useQuery(['categories'], async ({ signal }) => await getCategories(signal));
	const { data: categoriesResult } = useQuery(
		['SEARCH_CATEGORIES', category],
		async ({ signal }) => await searchCategory(category, signal),
		{ enabled: !!category },
	);

	// const [categories, setCategories] = useState({} as Categories);

	// useEffect(() => {
	// 	getCategories().then((res) => {
	// 		setCategories(res);
	// 	});
	// }, []);

	if (!categoriesList || !categoriesList) {
		return null;
	}

	return (
		<div>
			<div>currentCategory {category}</div>
			<Select
				variant="outline"
				placeholder="Categorías"
				bg={'white'}
				borderColor={'brand.700'}
				focusBorderColor="brand.900"
				color={'brand.700'}
				fontWeight={'bold'}
				_hover={{
					cursor: 'pointer',
				}}
				onChange={(e) => setCategory(e.target.value)}
			>
				{categoriesList.data.map((v) => (
					<option key={v.id}>{v.attributes.name}</option>
				))}
			</Select>

			<div>{categoriesResult && categoriesResult?.map((v) => <li key={v.id}>{v.id}</li>)}</div>
		</div>
	);
};
