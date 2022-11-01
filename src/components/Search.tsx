import { Flex, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CategoriesJobs, CompaniesJobs } from '../models';
import { getSeniorities } from '../services';
import { JobCard } from './JobCard';
import { Pagination } from './Pagination';

interface Props {
	inputSearch: string;
	resultsCategories: CategoriesJobs;
	resultsCompanies: CompaniesJobs;

	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPerPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	perPage: number;

	loading: boolean;
	error: boolean;
}

export const Search = ({
	inputSearch,
	resultsCategories,
	resultsCompanies,
	page,
	perPage,
	setPage,
	setPerPage,
	error,
	loading,
}: Props) => {
	const query = inputSearch.toLocaleLowerCase();
	const [seniorityState, setSeniorityState] = useState<{ id: string; seniority: string }[]>();

	const seniorityCode = async () => {
		await getSeniorities().then((res) => {
			setSeniorityState(res.data.map((el) => ({ id: el.id, seniority: el.attributes.name })));
		});
	};

	useEffect(() => {
		seniorityCode();
	}, []);

	if (loading) {
		return (
			<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="secondary.500" size="xl" />
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

			<SimpleGrid minChildWidth="400px" spacing="40px">
				{resultsCategories.data ? (
					resultsCategories.data
						.filter((d) => {
							const perks = d.attributes.perks;
							const seniorityId = d.attributes.seniority.data.id;
							const perksList = perks.find((el) => el.includes(query));
							const sr = seniorityState?.find((el) => el.id === seniorityId.toString())?.seniority;

							return (
								d.attributes?.title.toLowerCase().includes(query) ||
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
				) : (
					<>
						<Text>{loading && 'Loading...'}</Text>
					</>
				)}

				{resultsCompanies.data ? (
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
				) : (
					<Text>{loading ? 'Loading...' : 'No hay resultados...'}</Text>
				)}
			</SimpleGrid>

			<Pagination
				state={{ ...resultsCategories, ...resultsCompanies }}
				setPage={setPage}
				page={page}
				setPerPage={setPerPage}
			/>
		</>
	);
};
