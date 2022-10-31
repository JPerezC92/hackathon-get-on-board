import React, { useEffect, useState } from 'react';
import { Input, InputGroup, InputLeftElement, Stack, Text } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { getJobsCategories, getJobsCompanies } from '../services';

import { CategoriesJobs, CompaniesJobs } from '../models';

export const SearchInput = ({
	setSearch,
	search,
	endpoint,
}: {
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	search: string;
	endpoint: string;
}) => {
	const [resultsCategories, setResultsCategories] = useState({} as CategoriesJobs);
	const [resultsCompanies, setResultsCompanies] = useState({} as CompaniesJobs);
	const [error, setError] = useState<unknown>();
	const [loading, setLoading] = useState(true);
	const [inputSearch, setInputSearch] = useState<string>('');

	const companyResults = async (name: string) => {
		try {
			setLoading(false);
			const res = await getJobsCompanies(name, 10, 1);
			return res;
		} catch (error) {
			setError(error);
		}
	};

	const categoryResults = async (name: string) => {
		try {
			setLoading(false);

			const res = await getJobsCategories(name);
			return res;
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (search) {
			setLoading(true);

			if (endpoint === 'companies')
				companyResults(search).then((res) => {
					setResultsCategories({} as CategoriesJobs);
					setResultsCompanies(res);
				});
			if (endpoint === 'categories')
				categoryResults(search).then((res) => {
					setResultsCompanies({} as CompaniesJobs);
					setResultsCategories(res);
				});
		}
	}, [endpoint, search]);

	return (
		<>
			<InputGroup>
				<InputLeftElement pointerEvents="none" children={<BiSearchAlt2 color="gray.300" />} />
				<Input
					type="search"
					placeholder={'Buscar: Programacion...'}
					bg={'white'}
					borderColor={'brand.700'}
					focusBorderColor="brand.900"
					_hover={{
						borderColor: 'brand.700',
					}}
					value={inputSearch}
					onChange={(e) => {
						setInputSearch(e.target.value);
					}}
				/>
			</InputGroup>
			<Stack width={'100%'}>
				{resultsCategories.data
					? resultsCategories.data
							.filter((d) => {
								return d.attributes?.title.toLocaleLowerCase().includes(inputSearch.toLocaleLowerCase());
							})
							.map((d) => {
								return <Text key={d.id}>{d.attributes?.title}</Text>;
							})
					: null}

				{resultsCompanies.data
					? resultsCompanies.data
							.filter((d) => {
								return d.attributes?.title.toLocaleLowerCase().includes(inputSearch.toLocaleLowerCase());
							})
							.map((d) => {
								return <Text key={d.id}>{d.attributes?.title}</Text>;
							})
					: null}
			</Stack>
		</>
	);
};
