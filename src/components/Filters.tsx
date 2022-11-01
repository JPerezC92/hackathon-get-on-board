import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { CategoriesJobs, Companies, CompaniesJobs } from '../models';

import { SearchInput } from './SearchInput';
import { Search } from './Search';
import { getCategories, getCompanies } from '../services';
import { Category } from '../models/category.model';

export const Filters = () => {
	const [categories, setCategories] = useState([] as Category[]);
	const [companies, setCompanies] = useState({} as Companies);

	const [search, setSearch] = useState<string>('programming');
	const [filter, setFilter] = useState<string>('categories');
	const [inputSearch, setInputSearch] = useState<string>('');

	const [resultsCategories, setResultsCategories] = useState({} as CategoriesJobs);
	const [resultsCompanies, setResultsCompanies] = useState({} as CompaniesJobs);

	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);

	const [error, setError] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);

	const filterCatergories = async () => {
		try {
			setFilter('categories');
			setSearch('programming');
			setPerPage(10);
			setPage(1);
			const result = await getCategories();
			setCategories(result);
		} catch (error) {}
	};

	const filterCompanies = async () => {
		try {
			setSearch('ionix-spa');
			setFilter('companies');
			setPerPage(10);
			setPage(1);
			const result = await getCompanies();
			setCompanies(result);
		} catch (error) {}
	};

	useEffect(() => {
		filterCatergories();
	}, []);

	return (
		<Box my={10} mx={'auto'}>
			<Heading as={'h1'} my={10} textAlign={'center'} color={'secondary.300'}>
				Buscar Oportunidades de Empleo
			</Heading>

			<RadioGroup defaultValue={filter} my={5}>
				<Stack spacing={5} direction="row">
					<Radio value="categories" onChange={() => filterCatergories()}>
						Categorías
					</Radio>
					<Radio value="companies" onChange={() => filterCompanies()}>
						Compañías
					</Radio>
				</Stack>
			</RadioGroup>

			<SearchInput
				inputSearch={inputSearch}
				setInputSearch={setInputSearch}
				setSearch={setSearch}
				search={search}
				endpoint={filter}
				setResultsCategories={setResultsCategories}
				setResultsCompanies={setResultsCompanies}
				page={page}
				setPage={setPage}
				perPage={perPage}
				setPerPage={setPerPage}
				loading={loading}
				error={error}
				setError={setError}
				setLoading={setLoading}
			/>

			<Flex my={5} gap={5} direction={{ xs: 'column', md: 'row' }}>
				<Select
					variant="outline"
					placeholder="Compañías"
					bg={'white'}
					borderColor={'primary.500'}
					color={'primary.700'}
					fontWeight={'bold'}
					_hover={{
						borderColor: 'primary.700',
						cursor: 'pointer',
					}}
					onChange={(e) => setSearch(e.target.value)}
					disabled={filter === 'companies' ? false : true}
				>
					{companies.data
						? companies.data.map((company) => {
								return (
									<option key={company.id} value={company.id}>
										{company.attributes.name}
									</option>
								);
						  })
						: null}
				</Select>
				<Select
					variant="outline"
					placeholder="Categorías"
					bg={'white'}
					borderColor={'primary.500'}
					color={'primary.700'}
					fontWeight={'bold'}
					_hover={{
						borderColor: 'primary.700',
						cursor: 'pointer',
					}}
					onChange={(e) => setSearch(e.target.value)}
					disabled={filter === 'categories' ? false : true}
				>
					<>
						{categories
							? categories.map((category) => {
									return (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									);
							  })
							: null}
					</>
				</Select>
			</Flex>

			<Search
				resultsCompanies={resultsCompanies}
				resultsCategories={resultsCategories}
				inputSearch={inputSearch}
				setPage={setPage}
				setPerPage={setPerPage}
				page={page}
				perPage={perPage}
				loading={loading}
				error={error}
			/>
		</Box>
	);
};