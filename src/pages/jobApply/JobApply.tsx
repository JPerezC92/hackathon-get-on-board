import { LSKeys } from '@/utilities/localStorageKeys';
import z from 'zod';
import { Datum } from '@/models';
import { createJob } from '@/services';
import { useAuth } from '@/context/AuthProvider';
import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack, Text, VStack } from '@chakra-ui/react';
import './JobApply.css';

import { GetonboardIcon } from '@/components/Navbar/GetonboardIcon';
import { Job } from '@/models/job.model';

const JobApply = () => {
	// const jobStoraged = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Datum;
	const jobStoraged = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Job;
	const tittle = jobStoraged?.title;
	const company = jobStoraged?.company.name;

	const { user } = useAuth();
	const userId = user?.uid;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		userId && createJob(jobStoraged, userId);
	};

	return (
		<Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
			<Flex
				alignItems={'center'}
				justifyContent={'center'}
				direction={'column'}
				my={10}
				p={10}
				bgColor={'secondary.50'}
				rounded={'md'}
				borderWidth={'1px'}
				borderColor={'primary.500'}
				shadow={'lg'}
				minW={'320px'}
				mx={5}
			>
				<Flex>
					<Icon as={GetonboardIcon} />
				</Flex>

				<VStack mt={10} spacing={'5'}>
					<Heading as={'h3'} size={'lg'} color={'primary.600'}>
						Antes de aplicar a:
					</Heading>
					<Text fontStyle={'italic'} fontWeight={'bold'} color={'primary.700'}>
						{tittle}
					</Text>
					<Text fontWeight={'bold'} color={'primary.700'}>
						{company}
					</Text>
				</VStack>
				<Stack justifyContent={'center'} alignItems={'center'} mt={10}>
					<form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<VStack spacing={5}>
							<FormControl>
								<FormLabel htmlFor="salary">Salario deseado</FormLabel>

								<Input
									type="text"
									name="salary"
									id="salary"
									bg={'white'}
									borderColor={'primary-ligth.400'}
									_hover={{
										borderColor: 'primary.700',
									}}
								/>
							</FormControl>

							<FormControl>
								<FormLabel htmlFor="why">¿Por qué deseas trabajar con nosotros?</FormLabel>

								<Input
									type="text"
									name="why"
									id="why"
									bg={'white'}
									borderColor={'primary-ligth.400'}
									_hover={{
										borderColor: 'primary.700',
									}}
								/>
							</FormControl>
							<Button
								mt={5}
								bgColor={'secondary.300'}
								_hover={{
									backgroundColor: 'secondary.400',
								}}
								_active={{
									backgroundColor: 'secondary.400',
								}}
								type={'submit'}
							>
								Aplicar Ahora
							</Button>
						</VStack>
					</form>
				</Stack>
			</Flex>
		</Box>
	);
};

export default JobApply;
