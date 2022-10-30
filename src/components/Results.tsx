import { useEffect, useState } from 'react';
import { Box, Flex, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { Categories, Companies } from '../models';
import { getCategories, getCompanies } from '../services';
import { SearchInput } from './SearchInput';

export const Results = () => {
	const [categories, setCategories] = useState({} as Categories);
	const [companies, setCompanies] = useState({} as Companies);

	const [search, setSearch] = useState<string>('programming');
	const [filter, setFilter] = useState('categories');

	const filterCatergories = async () => {
		try {
			setSearch('');
			setFilter('categories');
			const result = await getCategories();
			setCategories(result);
		} catch (error) {
			console.log(error);
		}
	};

	const filterCompanies = async () => {
		try {
			setSearch('');
			setFilter('companies');
			const result = await getCompanies();
			setCompanies(result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		filterCatergories();
	}, []);

	return (
		<Box width={'100%'}>
			<RadioGroup defaultValue={filter}>
				<Stack spacing={5} direction="row">
					<Radio value="categories" onChange={() => filterCatergories()}>
						Categorías
					</Radio>
					<Radio value="companies" onChange={() => filterCompanies()}>
						Compañías
					</Radio>
				</Stack>
			</RadioGroup>

			<Flex>
				<SearchInput setSearch={setSearch} search={search} endpoint={filter} />

				<Select
					variant="outline"
					placeholder="Compañías"
					bg={'white'}
					borderColor={'brand.700'}
					focusBorderColor="brand.900"
					color={'brand.700'}
					fontWeight={'bold'}
					_hover={{
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
					borderColor={'brand.700'}
					focusBorderColor="brand.900"
					color={'brand.700'}
					fontWeight={'bold'}
					_hover={{
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
		</Box>
	);
};
