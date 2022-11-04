import { Box, Flex, Heading, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';

import { SearchInput } from './SearchInput';
import { Search } from './Search';
import { useSearch } from '@/context/SearchContext';
import { Tags } from './Tags';

export const Filters = () => {
	const {
		filter,
		setSearch,
		companies,
		categories,
		filterCategories,
		resetPagination,
		filterCompanies,
		resetAndClearCompanies,
		resetAndClearCategories,
		setInputSearch,
	} = useSearch();

	const handleSelectCategories = () => {
		filterCategories();
		resetPagination();
		resetAndClearCategories();
	};

	const handleSelectCompanies = () => {
		resetPagination();
		resetAndClearCompanies();
		filterCompanies();
	};

	return (
		<Box my={10} mx={'auto'}>
			<Heading as={'h1'} my={10} textAlign={'center'} color={'secondary.300'}>
				Buscar Oportunidades de Empleo
			</Heading>

			<RadioGroup defaultValue={filter} my={5}>
				<Stack spacing={5} direction="row">
					<Radio value="categories" color="primary-ligth.400" onChange={handleSelectCategories}>
						Categorías
					</Radio>
					<Radio value="companies" color="primary-ligth.400" onChange={handleSelectCompanies}>
						Compañías
					</Radio>
				</Stack>
			</RadioGroup>

			<SearchInput />

			<Flex my={5} gap={5} direction={{ xs: 'column', md: 'row' }}>
				<Select
					variant="outline"
					placeholder="Compañías"
					bg={'white'}
					borderColor={'primary-ligth.400'}
					color={'primary.700'}
					fontWeight={'bold'}
					_hover={{
						borderColor: 'primary.700',
					}}
					onChange={(e) => {
						setSearch(e.target.value);
						setInputSearch('');
					}}
					isDisabled={filter === 'companies' ? false : true}
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
					borderColor={'primary-ligth.400'}
					color={'primary.700'}
					fontWeight={'bold'}
					_hover={{
						borderColor: 'primary.700',
					}}
					onChange={(e) => {
						setSearch(e.target.value);
						setInputSearch('');
					}}
					isDisabled={filter === 'categories' ? false : true}
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

			<Tags />

			<Search />
		</Box>
	);
};
