import { queryKeys } from '@/models/queryKeys';
import { getCategories, getJobsCategoriesV2, getJobsCompaniesV2, getSearch } from '@/services';
import {
	Box,
	Button,
	Center,
	Grid,
	Heading,
	HStack,
	Input,
	Select,
	SimpleGrid,
	Spinner,
	Tag,
	TagLabel,
	Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { JobCard } from './JobCard/JobCard';
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

	// Local Filters
	const [tagFilter, setTagFilter] = React.useState('');
	const [seniorityFilter, setSeniorityFilter] = React.useState('');

	const { data: searchJobList, isLoading: searchJobListIsLoading } = useQuery(
		queryKeys.searchJobQuery(querySearch, page, perPage),
		async ({ signal }) => {
			const result = await getSearch({ query: querySearch ? querySearch : 'all', page, perPage, signal });
			return result;
		},
		{ enabled: !filterType, keepPreviousData: true },
	);

	const { data: categoryJobsList, isLoading: categoryJobListIsLoading } = useQuery(
		queryKeys.categoryJobQuery(categorySelect, page, perPage),
		async ({ signal }) => {
			const result = await getJobsCategoriesV2({ query: categorySelect, page, perPage, signal });

			return result;
		},
		{ enabled: filterTypeList.categories.value === filterType && !!categorySelect, keepPreviousData: true },
	);

	const { data: companyJobsList, isLoading: companyJobListIsLoading } = useQuery(
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

	const { data: categoryList, isLoading: categoryListIsLoading } = useQuery(
		queryKeys.categories,
		async ({ signal }) => {
			const result = await getCategories(signal);
			const firstCategory = result?.[0];
			setCategorySelect(firstCategory.id);
			return result;
		},
		{ enabled: filterTypeList.categories.value === filterType, keepPreviousData: true },
	);

	const isLoading =
		filterTypeList.categories.value === filterType
			? categoryJobListIsLoading || categoryListIsLoading
			: filterTypeList.companies.value === filterType
			? companyJobListIsLoading
			: searchJobListIsLoading;

	const jobList =
		filterTypeList.categories.value === filterType
			? categoryJobsList?.jobs
			: filterTypeList.companies.value === filterType
			? companyJobsList?.jobs
			: searchJobList?.jobs;

	const jobListLocalFilter =
		tagFilter && seniorityFilter
			? jobList?.filter(
					(job) => job.seniority.name === seniorityFilter && job.tagList.some((v) => v.name === tagFilter),
			  )
			: tagFilter
			? jobList?.filter((job) => job.tagList.some((v) => v.name === tagFilter))
			: seniorityFilter
			? jobList?.filter((job) => job.seniority.name === seniorityFilter)
			: jobList;

	const pagination =
		filterTypeList.categories.value === filterType
			? categoryJobsList?.meta
			: filterTypeList.companies.value === filterType
			? companyJobsList?.meta
			: searchJobList?.meta;

	const tagList = Array.from(new Set(jobList?.map((v) => v.tagList?.[0]?.name).flat())).filter((v) => v);
	const seniorityList = Array.from(new Set(jobList?.map((job) => job.seniority.name).flat()))
		.filter((v) => v)
		.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

	const cleanLocalFilters = () => {
		setTagFilter('');
		setSeniorityFilter('');
	};

	if (isLoading)
		return (
			<Center placeSelf="center" my="40">
				<Spinner m="auto" thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.500" size="xl" />
			</Center>
		);

	return (
		<Box my={10} mx={'auto'}>
			<Heading as={'h1'} my={10} textAlign={'center'} color={'secondary.300'}>
				Buscar Oportunidades de Empleo
			</Heading>

			<Grid
				as="form"
				onSubmit={(e) => {
					e.preventDefault();
					inputSearch && setQuerySearch(inputSearch);
					cleanLocalFilters();
				}}
				gap="4"
				gridTemplateColumns="repeat(auto-fit,minmax(min(100%,15rem),1fr))"
			>
				<Select
					bg="white"
					borderColor="primary.500"
					color="primary.700"
					fontWeight="bold"
					variant="outline"
					value={filterType}
					onChange={(v) => {
						v.target.value === filterType ? setFilterType('') : setFilterType(v.target.value);
						setQuerySearch('');
						cleanLocalFilters();
						setPage(1);
					}}
					_hover={{ borderColor: 'primary.700', cursor: 'pointer' }}
				>
					{Object.entries(filterTypeList).map(([, v]) => (
						<option key={v.value} value={v.value}>
							{v.name}
						</option>
					))}
				</Select>

				{filterType === filterTypeList.categories.value ? (
					<Select
						bg="white"
						borderColor="primary.500"
						color="primary.700"
						fontWeight="bold"
						variant="outline"
						onChange={(e) => {
							setCategorySelect(e.target.value);
							cleanLocalFilters();
						}}
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
				) : (
					<>
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

						<Button
							type="submit"
							bg="primary-ligth.600"
							_hover={{
								bgColor: 'primary.700',
							}}
							_active={{
								bgColor: 'primary.700',
							}}
						>
							Buscar
						</Button>
					</>
				)}
			</Grid>

			<HStack rowGap={4} wrap={'wrap'} justifyContent={'center'} alignItems={'center'} my={5}>
				{tagList?.map((el) => {
					return (
						<Tag
							_hover={{ cursor: 'pointer' }}
							onClick={() => (tagFilter === el ? setTagFilter('') : setTagFilter(el))}
							size={'md'}
							key={el}
							variant="solid"
							bgColor={el === tagFilter ? 'secondary.600' : 'secondary.300'}
						>
							<TagLabel>{el}</TagLabel>
						</Tag>
					);
				})}
			</HStack>

			<HStack rowGap={4} wrap={'wrap'} justifyContent={'center'} alignItems={'center'} my={5}>
				{seniorityList.map((el) => {
					return (
						<Tag
							_hover={{ cursor: 'pointer' }}
							onClick={() => (seniorityFilter === el ? setSeniorityFilter('') : setSeniorityFilter(el))}
							size={'md'}
							key={el}
							variant="solid"
							bgColor={el === seniorityFilter ? 'primary.600' : 'primary.300'}
						>
							<TagLabel>{el}</TagLabel>
						</Tag>
					);
				})}
			</HStack>

			<Pagination
				visibility={jobListLocalFilter?.length ? 'visible' : 'hidden'}
				pagesCount={pagination?.total_pages}
				currentPage={page}
				onChangePage={(page) => {
					setPage(Number(page));
				}}
				onChangePerPage={(v) => setPerPage(Number(v))}
			/>

			<SimpleGrid as="ul" minChildWidth={{ xs: 'auto', md: '35rem' }} spacing="5" mt="4">
				{jobListLocalFilter?.length ? (
					jobListLocalFilter?.map((job) => (
						<Box as="li" key={job.id} display="contents">
							<JobCard job={job} />
						</Box>
					))
				) : (
					<Text textAlign="center" fontSize="xl" color="primary.700" fontWeight="bold">
						No se encontraron ofertas en esta pagina
					</Text>
				)}
			</SimpleGrid>

			<Pagination
				pagesCount={pagination?.total_pages}
				visibility={jobListLocalFilter?.length ? 'visible' : 'hidden'}
				currentPage={page}
				onChangePage={(page) => {
					setPage(Number(page));
				}}
				onChangePerPage={(v) => setPerPage(Number(v))}
			/>
		</Box>
	);
};
