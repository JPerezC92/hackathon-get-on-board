import { useSearch } from '@/context/SearchContext';
import { CategoriesJobs, Companies, CompaniesJobs } from '@/models';
import { Category } from '@/models/category.model';
import { Button, ButtonGroup, Box, Text, Stack, Select, Icon } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface Props<T, K> {
	state: T | K;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props<Companies, CategoriesJobs>> = ({ state, setPage, page, setPerPage }) => {
	const { setInputSearch } = useSearch();

	const onGoBack = () => {
		if (state?.meta?.page > 1) {
			setPage(page - 1);
			setInputSearch('');
		}
	};

	const onGoAhead = () => {
		if (state?.meta?.page < state?.meta?.total_pages) {
			setPage(page + 1);
			setInputSearch('');
		}
	};

	const selectPages = (event: any) => {
		setPerPage(Number(event.target.value));
	};

	return (
		<>
			{Array.isArray(state.data) && state.data.length > 0 ? (
				<Box display="flex" alignItems="center" justifyContent="center" width="100%" py={5} mb={2}>
					<ButtonGroup justifyContent={'center'} alignItems={'center'} gap="4">
						<Text as="b" fontSize="md">
							Page: {page} / {state?.meta?.total_pages}
						</Text>
						<Stack spacing={3}>
							<Select
								variant="outline"
								bg={'white'}
								borderColor={'primary-ligth.400'}
								color={'primary.700'}
								fontWeight={'bold'}
								_hover={{
									borderColor: 'primary.700',
									cursor: 'pointer',
								}}
								placeholder="Jobs per page"
								onChange={selectPages}
							>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={15}>15</option>
							</Select>
						</Stack>
						<Button
							colorScheme="gray"
							variant="outline"
							borderColor={'secondary.300'}
							_hover={{
								borderColor: 'secondary.500',
							}}
							_active={{
								borderColor: 'secondary.500',
							}}
							color={'secondary.400'}
							fontWeight={'bold'}
							onClick={onGoBack}
						>
							<Icon as={AiOutlineLeft} />
						</Button>
						<Button
							colorScheme="gray"
							variant="outline"
							borderColor={'secondary.300'}
							_hover={{
								borderColor: 'secondary.500',
							}}
							_active={{
								borderColor: 'secondary.500',
							}}
							color={'secondary.400'}
							fontWeight={'bold'}
							onClick={onGoAhead}
						>
							<Icon as={AiOutlineRight} />
						</Button>
					</ButtonGroup>
				</Box>
			) : null}
		</>
	);
};
