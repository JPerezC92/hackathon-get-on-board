import { useEffect, useState } from 'react';
import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { CategoriesJobs, CompaniesJobs } from '../models';
import { Pagination } from './Pagination';
import { getSeniorities } from '../services';

interface Props {
	inputSearch: string;
	resultsCategories: CategoriesJobs;
	resultsCompanies: CompaniesJobs;

	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPerPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	perPage: number;
}

export const Results = ({
	inputSearch,
	resultsCategories,
	resultsCompanies,
	page,
	perPage,
	setPage,
	setPerPage,
}: Props) => {
	let query = inputSearch.toLocaleLowerCase();
	const [seniorityState, setSeniorityState] = useState<{ id: string; seniority: string }[]>();

	let seniorityCode = async () => {
		await getSeniorities().then((res) => {
			setSeniorityState(res.data.map((el) => ({ id: el.id, seniority: el.attributes.name })));
		});
	};

	useEffect(() => {
		seniorityCode();
	}, []);

	return (
		<>
			<Pagination
				state={{ ...resultsCategories, ...resultsCompanies }}
				setPage={setPage}
				page={page}
				setPerPage={setPerPage}
			/>

			<Stack width={'100%'}>
				{resultsCategories.data
					? resultsCategories.data
							.filter((d) => {
								let perks = d.attributes.perks;
								let seniorityId = d.attributes.seniority.data.id;
								let perksList = perks.find((el) => el.includes(query));
								let sr = seniorityState?.find((el) => el.id === seniorityId.toString())?.seniority;

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
								return <Text key={d.id}>{d.attributes?.title}</Text>;
							})
					: null}

				{resultsCompanies.data
					? resultsCompanies.data

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
								return <Text key={d.id}>{d.attributes?.title}</Text>;
							})
					: null}
			</Stack>
			<Pagination
				state={{ ...resultsCategories, ...resultsCompanies }}
				setPage={setPage}
				page={page}
				setPerPage={setPerPage}
			/>
		</>
	);
};
