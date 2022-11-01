import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { Categories, CategoriesJobs, Companies, CompaniesJobs } from '../models';

import { SearchInput } from './SearchInput';
import { Results } from './Results';
import { getCategories, getCompanies } from '../services';

export const Filters = () => {
	const [categories, setCategories] = useState({} as Categories);
	const [companies, setCompanies] = useState({} as Companies);

	const [search, setSearch] = useState<string>('programming');
	const [filter, setFilter] = useState<string>('categories');
	const [inputSearch, setInputSearch] = useState<string>('');

	const [resultsCategories, setResultsCategories] = useState({} as CategoriesJobs);
	const [resultsCompanies, setResultsCompanies] = useState({} as CompaniesJobs);

	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);

	const filterCatergories = async () => {
		try {
			setFilter('categories');

			setPerPage(10);
			setPage(1);
			const result = await getCategories();
			setCategories(result);
		} catch (error) {
			console.log(error);
		}
	};

	const filterCompanies = async () => {
		try {
			setSearch('ionix-spa');
			setFilter('companies');
			setPerPage(10);
			setPage(1);
			const result = await getCompanies();
			setCompanies(result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		filterCatergories();
		// filterCompanies();
	}, []);

	return (
		<Box width={{ xs: '100%', md: '50%' }} my={10} mx={'auto'}>
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
						{categories.data
							? categories.data.map((category) => {
									return (
										<option key={category.id} value={category.id}>
											{category.attributes.name}
										</option>
									);
							  })
							: null}
					</>
				</Select>
			</Flex>

			<Results
				resultsCompanies={resultsCompanies}
				resultsCategories={resultsCategories}
				inputSearch={inputSearch}
				setPage={setPage}
				setPerPage={setPerPage}
				page={page}
				perPage={perPage}
			/>
		</Box>
	);
};
