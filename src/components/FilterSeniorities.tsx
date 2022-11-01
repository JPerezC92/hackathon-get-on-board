import { Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { Companies, Seniorities } from '../models';
import { getCompanies, getSeniorities } from '../services';

export const FilterSeniorities = () => {
	const [seniorities, setSenorities] = useState({} as Seniorities);

	useEffect(() => {
		getSeniorities().then((res: unknown) => {
			setSenorities(res);
		});
	}, []);

	return (
		<div>
			<Select
				variant="outline"
				placeholder="Companies"
				bg={'white'}
				borderColor={'brand.700'}
				focusBorderColor="brand.900"
				color={'brand.700'}
				fontWeight={'bold'}
				_hover={{
					cursor: 'pointer',
				}}
				onChange={(e) => {
					console.log(e.target.value);
				}}
			>
				{Array.isArray(seniorities?.data)
					? seniorities?.data.map((serionity) => {
							return (
								<option key={serionity.id} value={serionity.id}>
									{serionity.attributes.name}
								</option>
							);
					  })
					: null}
			</Select>
		</div>
	);
};
