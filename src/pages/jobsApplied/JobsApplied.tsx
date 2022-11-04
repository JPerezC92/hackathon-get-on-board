import { JobCard } from '@/components/JobCard/JobCard';
import Layout from '@/layout';
import { Job } from '@/models/job.model';
import { Box, Flex, Heading, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { getJobs } from '../../services/getJobs';

const JobsApplied = () => {
	const [jobs, setJobs] = useState<Array<Job>>([]);
	const { user } = useAuth();
	const userId = user?.uid;

	useEffect(() => {
		if (userId)
			getJobs(userId).then((data) => {
				setJobs(data);
			});
	}, [userId]);

	if (!jobs) {
		return (
			<Layout>
				<Flex w={'full'} justifyContent={'center'} alignItems={'center'} my={5}>
					<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="secondary.300" size="xl" />
				</Flex>
			</Layout>
		);
	}

	return (
		<Layout>
			<VStack w="full">
				<Heading as="h2" color="primary.700" my={5}>
					Mis Postulaciones
				</Heading>

				<Box as="section" display={jobs.length ? 'block' : 'block'} w={'50%'}>
					<Text fontWeight={'bold'} textAlign={'center'} fontSize={'2xl'} color={'secondary.500'}>
						Total: {jobs.length}
					</Text>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />
				</Box>

				<Box as="ul" w="full">
					{jobs.length > 0 ? (
						<SimpleGrid minChildWidth={{ xs: 'auto', md: '35rem' }} spacing="5">
							{jobs?.map((job) => (
								<Box as="li" key={job.id} display="contents">
									<JobCard job={job} minW="sm" />
								</Box>
							))}
						</SimpleGrid>
					) : (
						<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
							<Text fontSize={'2xl'} fontWeight={'bold'} color={'primary.700'}>
								No hay postulaciones
							</Text>
						</Flex>
					)}
				</Box>
			</VStack>
		</Layout>
	);
};

export default JobsApplied;
