import { useSearch } from '@/context/SearchContext';
import { Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { JobCard } from './JobCard';
import { Pagination } from './Pagination';

export const Search = () => {
	const {
		page,
		loading,
		inputSearch,
		error,
		setPage,
		setPerPage,
		resultsCategories,
		resultsCompanies,
		seniorityState,
		search,
		filter,
		categories,
	} = useSearch();

	const query = inputSearch.toLowerCase();

	// useEffect(() => {
	// 	console.log({ search, filter, inputSearch, resultsCategories, categories });
	// }, [search, filter, inputSearch, resultsCategories, categories]);

	if (loading) {
		return (
			<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="secondary.300" size="xl" />
			</Flex>
		);
	}

	if (error) {
		return (
			<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
				<Text textAlign={'center'} color={'secondary.500'} fontSize={'3xl'}>
					{error && 'Error... Recarga tu página'}
				</Text>
			</Flex>
		);
	}

	return (
		<>
			<Pagination
				state={{ ...resultsCategories, ...resultsCompanies }}
				setPage={setPage}
				page={page}
				setPerPage={setPerPage}
			/>

			{loading ? (
				<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="secondary.300" size="xl" />
				</Flex>
			) : (
				<SimpleGrid minChildWidth="400px" spacing="40px">
					{Array.isArray(resultsCategories.data) && resultsCategories.data.length <= 0 ? (
						<Flex justifyContent={'center'} alignItems={'center'}>
							<Text textAlign={'center'} fontSize={'xl'} color={'primary.700'}>
								Aun no hay ofertas publicadas para esta compañía. Recarga la pagina o buscar otras ofertas parecidas.
							</Text>
						</Flex>
					) : resultsCategories.data ? (
						resultsCategories.data
							.filter((d) => {
								const perks = d.attributes.perks;
								const seniorityId = d.attributes.seniority.data.id;
								const perksList = perks.find((el) => el.includes(query));
								const sr = seniorityState?.find((el) => el.id === seniorityId.toString())?.seniority;

								return (
									d.attributes?.title.toLowerCase().includes(query) ||
									d.attributes?.company?.data?.attributes?.name.toLowerCase().includes(query) ||
									d.attributes?.category_name.toLowerCase().includes(query) ||
									d.attributes?.country.toLowerCase().includes(query) ||
									d.attributes?.max_salary?.toString().toLowerCase().includes(query) ||
									d.attributes?.min_salary?.toString().toLowerCase().includes(query) ||
									sr?.toLowerCase() === query ||
									perksList
								);
							})
							.map((d) => {
								return <JobCard key={d.id} job={d} />;
							})
					) : null}

					{Array.isArray(resultsCompanies.data) && resultsCompanies.data.length <= 0 ? (
						<Flex justifyContent={'center'} alignItems={'center'}>
							<Text textAlign={'center'} fontSize={'xl'} color={'primary.700'}>
								Aun no hay ofertas publicadas para esta compañía. Recarga la pagina o buscar otras ofertas parecidas.
							</Text>
						</Flex>
					) : resultsCompanies.data ? (
						resultsCompanies.data

							.filter((d) => {
								return (
									d.attributes?.title.toLowerCase().includes(query) ||
									d.attributes?.category_name.toLowerCase().includes(query) ||
									d.attributes?.country.toLowerCase().includes(query) ||
									d.attributes?.max_salary?.toString().toLowerCase().includes(query) ||
									d.attributes?.min_salary?.toString().toLowerCase().includes(query)
								);
							})
							.map((d) => {
								return <JobCard key={d.id} job={d} />;
							})
					) : null}
				</SimpleGrid>
			)}

			<Pagination
				state={{ ...resultsCategories, ...resultsCompanies }}
				setPage={setPage}
				page={page}
				setPerPage={setPerPage}
			/>
		</>
	);
};
