import { useSearch } from '@/context/SearchContext';
import { Flex, HStack, Spinner, Tag, TagLabel, TagRightIcon, Text } from '@chakra-ui/react';
import { IoMdWifi } from 'react-icons/io';

export const Tags = () => {
	const { resultsCategories, setInputSearch, seniorityState, loading, error } = useSearch();

	if (loading) {
		return (
			<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="primary.300" size="xl" />
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
			<HStack rowGap={4} wrap={'wrap'} justifyContent={'center'} alignItems={'center'} my={5}>
				{resultsCategories.data
					? resultsCategories.data
							.filter(() => {
								return resultsCategories.data.find((el) => el.attributes);
							})
							.map((el) => {
								return (
									<Tag
										_hover={{ cursor: 'pointer' }}
										onClick={() => setInputSearch(el.attributes.title)}
										size={'md'}
										key={el.id}
										variant="solid"
										bgColor="secondary.300"
									>
										<TagLabel>{el.attributes.title}</TagLabel>
									</Tag>
								);
							})
					: null}
			</HStack>

			<HStack rowGap={4} wrap={'wrap'} justifyContent={'center'} alignItems={'center'} my={5}>
				{Array.isArray(seniorityState)
					? seniorityState.map((el) => {
							return (
								<Tag
									_hover={{ cursor: 'pointer' }}
									onClick={() => setInputSearch(el.seniority.toLowerCase())}
									size={'md'}
									key={el.id}
									variant="solid"
									bgColor="primary.300"
								>
									<TagLabel>{el.seniority}</TagLabel>
								</Tag>
							);
					  })
					: null}
			</HStack>

			{resultsCategories.data && resultsCategories.data.length > 0 ? (
				<HStack rowGap={4} wrap={'wrap'} justifyContent={'center'} alignItems={'center'} my={5}>
					{[{ name: 'Remote', icon: IoMdWifi }].map((el) => {
						return (
							<Tag
								_hover={{ cursor: 'pointer' }}
								onClick={() => setInputSearch(el.name.toLowerCase())}
								size={'md'}
								key={el.name}
								variant="solid"
								bgColor="primary.600"
							>
								<TagLabel>{el.name}</TagLabel>
								<TagRightIcon as={el.icon} />
							</Tag>
						);
					})}
				</HStack>
			) : null}
		</>
	);
};
