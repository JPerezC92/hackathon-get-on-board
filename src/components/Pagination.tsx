import { Button, ButtonGroup, Box, Text, Stack, Select } from '@chakra-ui/react';

interface Props {
	state: any;
	page: number;
	setPage: (number: number) => void;
	setPerPage: (number: number) => void;
}

export const Pagination = ({ state, setPage, page, setPerPage }: Props) => {
	const onGoBack = () => {
		if (state?.meta?.page > 1) {
			setPage(page - 1);
		}
	};

	const onGoAhead = () => {
		if (state?.meta?.page < state?.meta?.total_pages) {
			setPage(page + 1);
		}
	};

	const selectPages = (event: any) => {
		setPerPage(event.target.value);
	};

	return (
		<Box display="flex" alignItems="center" justifyContent="center" width="100%" py={12} mb={2}>
			<ButtonGroup gap="4">
				<Text as="b" fontSize="md">
					Page: {page} / {state?.meta?.total_pages}
				</Text>
				<Stack spacing={3}>
					<Select size="sm" placeholder="Jobs per page" onChange={selectPages}>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
					</Select>
				</Stack>
				<Button colorScheme="gray" variant="outline" onClick={onGoBack}>
					{'<'}
				</Button>
				<Button colorScheme="gray" variant="outline" onClick={onGoAhead}>
					{'>'}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
