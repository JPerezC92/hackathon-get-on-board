import { Box, Heading, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { JobCard } from '../../components/JobCard';
import { getCategories, getJobsCategories } from '../../services/getCategories';

export const HomePage: React.FC = () => {
	const [defaultFilter, setDefaultFilter] = React.useState('categories');
	const [filterValue, setFilterValue] = React.useState('');

	const { data: categoryList } = useQuery(['CATEGORIES'], async ({ signal }) => {
		const categoryList = await getCategories(signal);
		const firstCategory = categoryList?.[0];
		if (firstCategory) {
			setFilterValue(firstCategory.id);
		}
		return await getCategories(signal);
	});

	const { data: jobResultByCategory } = useQuery(
		['CATEGORIES_SEARCH_JOB', filterValue],
		async ({ signal }) => {
			return await getJobsCategories(filterValue, signal);
		},
		{ enabled: !!categoryList && !!filterValue },
	);

	if (!categoryList || !categoryList) {
		return <>loading</>;
	}

	return (
		<div>
			<Heading size="xl">Busca tu nuevo empleo</Heading>
			{defaultFilter}
			{filterValue}
			<RadioGroup defaultValue={defaultFilter}>
				<Box as="fieldset" border="1px" p="2">
					<Box as="legend" px="2">
						Buscar por
					</Box>
					<Stack spacing={5} direction="row">
						<Radio value="categories" onChange={(e) => setDefaultFilter(e.target.value)}>
							Categorías
						</Radio>
						<Radio value="companies" onChange={(e) => setDefaultFilter(e.target.value)}>
							Compañías
						</Radio>
					</Stack>
				</Box>
			</RadioGroup>

			<Select onChange={(e) => setFilterValue(e.target.value)} value={categoryList[0].id}>
				{categoryList.map((data) => (
					<option key={data.id} value={data.id}>
						{data.name}
					</option>
				))}
			</Select>

			<Heading>Results</Heading>

			<Box
				as="ol"
				display="grid"
				gridTemplateColumns={[
					'repeat(auto-fill,minmax(min(100%,18.5rem),1fr))',
					null,
					null,
					'repeat(auto-fill,minmax(min(100%,20rem),1fr))',
				]}
				gap="4"
				m="4"
			>
				{jobResultByCategory?.map((v, i) => (
					<Box as="li" key={i} display="contents">
						<JobCard key={v.id} job={v} />
					</Box>
				))}
			</Box>
		</div>
	);
};
