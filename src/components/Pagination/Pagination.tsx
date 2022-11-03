import { ChakraProps, Flex, HStack, IconButton, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

type PaginationProps = {
	pagesCount?: number;
	currentPage: number;
	onChangePage: (page: number | string) => void;
	onChangePerPage: (page: number | string) => void;
} & ChakraProps;

export const Pagination: React.FC<PaginationProps> = ({
	pagesCount,
	currentPage,
	onChangePage,
	onChangePerPage,
	...props
}) => {
	return (
		<Flex
			{...props}
			data-testid="pagination"
			flexDirection={{ sm: 'column', md: 'row' }}
			gap="4"
			my="4"
			justifyContent="end"
		>
			<HStack spacing={3} mx="auto" m={{ md: '0' }}>
				<Text as="b" fontSize="md" whiteSpace="nowrap">
					Page: {currentPage} / {pagesCount}
				</Text>

				<Select
					size="sm"
					placeholder="Jobs per page"
					onChange={(e) => onChangePerPage(e.target.value)}
					maxW="40"
					variant="outline"
					bg={'white'}
					borderColor={'primary.500'}
					color={'primary.700'}
					fontWeight={'bold'}
					_hover={{
						borderColor: 'primary.700',
						cursor: 'pointer',
					}}
				>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
				</Select>
			</HStack>

			<HStack spacing={3} mx="auto" m={{ md: '0' }}>
				<IconButton
					aria-label="pagination"
					colorScheme="gray"
					variant="outline"
					borderColor={'secondary.300'}
					color={'secondary.400'}
					fontWeight={'bold'}
					disabled={!(currentPage > 1)}
					onClick={() => onChangePage(currentPage - 1)}
					icon={<MdNavigateBefore />}
					pointerEvents={!(currentPage > 1) ? 'none' : undefined}
				/>

				<Select
					size="sm"
					placeholder="Pages"
					onChange={(e) => onChangePage(Number(e.target.value))}
					maxW="40"
					minH="9"
					variant="outline"
					bg={'white'}
					borderColor={'primary.500'}
					color={'primary.700'}
					fontWeight={'bold'}
					_hover={{
						borderColor: 'primary.700',
						cursor: 'pointer',
					}}
				>
					{Array(pagesCount)
						.fill('')
						.map((_, i) => i + 1)
						.map((v) => (
							<option key={v} value={v}>
								{v}
							</option>
						))}
				</Select>

				<IconButton
					aria-label="pagination"
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
					disabled={!(!!pagesCount && currentPage < pagesCount)}
					onClick={() => onChangePage(currentPage + 1)}
					pointerEvents={!(!!pagesCount && currentPage < pagesCount) ? 'none' : undefined}
					icon={<MdNavigateNext />}
				/>
			</HStack>
		</Flex>
	);
};
