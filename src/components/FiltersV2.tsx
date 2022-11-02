import { Box, Button, Flex, Heading, Input, Radio, RadioGroup, Select, SimpleGrid, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { queryKeys } from '../models/queryKeys';
import { getCategories, getJobsCategoriesV2, getJobsCompaniesV2, getSearch } from '../services';
import { JobCardV2 } from './JobCard/JobCardv2';
import { Pagination } from './Pagination/index';

const filterTypeList = {
	none: { name: 'Busqueda', value: '' },
	categories: { name: 'Por categorías', value: 'categories' },
	companies: { name: 'Por compañías', value: 'companies' },
};

export const Filters = () => {
	const [filterType, setFilterType] = React.useState(filterTypeList.none.value);
	const [categorySelect, setCategorySelect] = React.useState('');
	const [inputSearch, setInputSearch] = React.useState('');
	const [querySearch, setQuerySearch] = React.useState('');
	const [page, setPage] = React.useState(1);
	const [perPage, setPerPage] = React.useState(10);

	const { data: searchJobList } = useQuery(
		queryKeys.searchJobQuery(querySearch, page, perPage),
		async ({ signal }) => {
			const result = await getSearch({ query: querySearch ? querySearch : 'all', page, perPage, signal });
			return result;
		},
		{ enabled: !filterType, keepPreviousData: true },
	);

	const { data: categoryJobsList } = useQuery(
		queryKeys.categoryJobQuery(categorySelect, page, perPage),
		async ({ signal }) => {
			const result = await getJobsCategoriesV2({ query: categorySelect, page, perPage, signal });

			return result;
		},
		{ enabled: filterTypeList.categories.value === filterType && !!categorySelect, keepPreviousData: true },
	);

	const { data: companyJobsList } = useQuery(
		queryKeys.companyJobQuery(querySearch, page, perPage),
		async ({ signal }) => {
			const result = await getJobsCompaniesV2({
				company: querySearch ? querySearch : 'ionix-spa',
				page,
				perPage,
				signal,
			});

			return result;
		},
		{ enabled: filterTypeList.companies.value === filterType, keepPreviousData: true },
	);

	const { data: categoryList } = useQuery(
		queryKeys.categories,
		async ({ signal }) => {
			const result = await getCategories(signal);
			const firstCategory = result?.[0];
			setCategorySelect(firstCategory.id);
			return result;
		},
		{ enabled: filterTypeList.categories.value === filterType, keepPreviousData: true },
	);

	const jobList =
		filterTypeList.categories.value === filterType
			? categoryJobsList?.jobs
			: filterTypeList.companies.value === filterType
			? companyJobsList?.jobs
			: searchJobList?.jobs;

	const pagination =
		filterTypeList.categories.value === filterType
			? categoryJobsList?.meta
			: filterTypeList.companies.value === filterType
			? companyJobsList?.meta
			: searchJobList?.meta;

	return (
		<Box my={10} mx={'auto'}>
			<Heading as={'h1'} my={10} textAlign={'center'} color={'secondary.300'}>
				Buscar Oportunidades de Empleo
			</Heading>

			<RadioGroup
				defaultValue={filterType}
				value={filterType}
				onChange={(v) => {
					v === filterType ? setFilterType('') : setFilterType(v);
					setQuerySearch('');
					setPage(1);
				}}
				my={5}
			>
				<Stack spacing={5} direction="row">
					{Object.entries(filterTypeList).map(([, v]) => (
						<Radio key={v.value} value={v.value}>
							{v.name}
						</Radio>
					))}
				</Stack>
			</RadioGroup>

			{filterType === filterTypeList.categories.value ? (
				<Flex my={5} gap={5} direction={{ xs: 'column', md: 'row' }}>
					<Select
						bg="white"
						borderColor="primary.500"
						color="primary.700"
						fontWeight="bold"
						variant="outline"
						onChange={(e) => setCategorySelect(e.target.value)}
						placeholder="Categorías"
						value={categorySelect}
						_hover={{ borderColor: 'primary.700', cursor: 'pointer' }}
					>
						{categoryList?.map((category) => {
							return (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							);
						})}
					</Select>
				</Flex>
			) : (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						inputSearch && setQuerySearch(inputSearch);
					}}
				>
					<Input
						bg="white"
						borderColor="primary.500"
						color="primary.700"
						fontWeight="bold"
						variant="outline"
						value={inputSearch}
						onChange={(e) => {
							setInputSearch(e.target.value);
						}}
					/>

					<Button type="submit" bg="primary-ligth.600" mt="2">
						Buscar
					</Button>
				</form>
			)}

			<Pagination
				pagesCount={pagination?.total_pages}
				currentPage={page}
				onChangePage={(page) => {
					setPage(Number(page));
				}}
				onChangePerPage={(v) => setPerPage(Number(v))}
			/>

			<SimpleGrid as="ul" minChildWidth="400px" spacing="40px" mt="4">
				{jobList?.map((job) => (
					<Box as="li" key={job.id} display="contents">
						<JobCardV2 job={job} />
					</Box>
				))}
			</SimpleGrid>

			<Pagination
				pagesCount={pagination?.total_pages}
				currentPage={page}
				onChangePage={(page) => {
					setPage(Number(page));
				}}
				onChangePerPage={(v) => setPerPage(Number(v))}
			/>
		</Box>
	);
};
