import React, { useEffect, useState } from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { getJobsCategories, getJobsCompanies } from '../services';
import { CategoriesJobs, CompaniesJobs } from '../models';
import { useSearch } from '../context/SearchContext';

export const SearchInput = () => {
	const {
		setLoading,
		setError,
		page,
		perPage,
		search,
		filter,
		inputSearch,
		setInputSearch,
		setResultsCategories,
		setResultsCompanies,
	} = useSearch();

	const companyResults = async (name: string) => {
		try {
			setLoading(false);
			setError(false);
			const res = await getJobsCompanies(name, perPage, page);
			return res;
		} catch (error) {
			setError(true);
		}
	};

	const categoryResults = async (name: string) => {
		try {
			setLoading(false);
			setError(false);
			// Here we check
			const res = await getJobsCategories(name, perPage, page);
			return res;
		} catch (error) {
			setError(true);
		}
	};

	// const debounce = (cb: Function, d: number) => {
	// 	let timer: any;

	// 	return (...args: []) => {
	// 		if (timer) clearTimeout(timer);

	// 		timer = setTimeout(() => {
	// 			cb(...args);
	// 		}, d);
	// 	};
	// };

	useEffect(() => {
		if (search) {
			if (filter === 'companies')
				companyResults(search).then((res) => {
					setResultsCategories({} as CategoriesJobs);
					setResultsCompanies(res);
				});

			if (filter === 'categories')
				categoryResults(search).then((res) => {
					setResultsCompanies({} as CompaniesJobs);

					setResultsCategories(res);
				});
		}
	}, [filter, search, page, perPage]);

	// const handleSearch = debounce((e: { target: { value: React.SetStateAction<string> } }) => {
	// 	setInputSearch(e.target.value);
	// }, 2000);

	return (
		<>
			<InputGroup>
				<InputLeftElement pointerEvents="none" color={'secondary.500'}>
					<BiSearchAlt2 />
				</InputLeftElement>
				<Input
					type="search"
					placeholder={'Filtrar resultados...'}
					bg={'white'}
					borderColor={'primary.700'}
					_hover={{
						borderColor: 'primary.700',
					}}
					value={inputSearch}
					onChange={(e) => setInputSearch(e.target.value)}
				/>
			</InputGroup>
		</>
	);
};
