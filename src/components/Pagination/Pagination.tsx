import { Flex, HStack, IconButton, Select, Text } from '@chakra-ui/react';
import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

type PaginationProps = {
	pagesCount?: number;
	currentPage: number;
	onChangePage: (page: number | string) => void;
	onChangePerPage: (page: number | string) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ pagesCount, currentPage, onChangePage, onChangePerPage }) => {
	return (
		<Flex data-testid="pagination" flexDirection={{ sm: 'column', md: 'row' }} gap="4" my="4">
			<HStack spacing={3} mx="auto">
				<Text as="b" fontSize="md" whiteSpace="nowrap">
					Page: {currentPage} / {pagesCount}
				</Text>

				<Select size="sm" placeholder="Jobs per page" onChange={(e) => onChangePerPage(e.target.value)} maxW="40">
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
				</Select>
			</HStack>

			<HStack spacing={3} mx="auto">
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

				{/* <Select
        value={currentPage.toString()}
        onChange={onChangePage}
        className="text-ct-primary-400 outline-ct-neutral-ligth-400"
      >
        {range(pagesCount || currentPage).map((v) => (
          <Option
            key={v}
            value={v + 1}
            className={`outline-ct-neutral-ligth-400 ${
              currentPage === v + 1
                ? 'bg-gradient-to-l from-ct-primary-400 to-ct-secondary-400 bg-clip-text text-transparent'
                : 'text-ct-neutral-medium-100'
            }`}
          >
            Page {v + 1}
          </Option>
        ))}
      </Select> */}

				<Select size="sm" placeholder="Pages" onChange={(e) => onChangePage(Number(e.target.value))} maxW="40">
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
