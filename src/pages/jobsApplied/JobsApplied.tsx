import { Footer } from '@/components';
import { JobCard } from '@/components/JobCard';
import Layout from '@/layout';
import { Job } from '@/models/job.model';
import { Box, Flex, Heading, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { Datum } from '../../models';
import { getJobs } from '../../services/getJobs';
import { LSKeys } from '../../utilities/localStorageKeys';

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

	const navigate = useNavigate();

	const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { className } = e.target as HTMLButtonElement;
		const index = Number(className);
		window.localStorage.setItem(LSKeys.jobDetail, JSON.stringify(jobs[index]));
		navigate('/jobs/' + jobs[index].id);
	};

	if (!jobs) {
		return (
			<Flex w={'full'} justifyContent={'center'} alignItems={'center'} my={5}>
				<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="secondary.300" size="xl" />
			</Flex>
		);
	}

	return (
		<>
			<VStack>
				<Heading as="h2" color="primary.700" my={5}>
					Mis Postulaciones
				</Heading>

				<Box as="section" display={jobs.length ? 'block' : 'block'} w={'50%'}>
					<Text fontWeight={'bold'} textAlign={'center'} fontSize={'2xl'} color={'secondary.500'}>
						Total: {jobs.length}
					</Text>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />
				</Box>
				{jobs.length > 0 ? (
					<SimpleGrid minChildWidth="400px" spacing="40px">
						<Flex justifyContent={'center'} alignItems={'center'}>
							{jobs?.map((job, index) => (
								<JobCard key={index} job={job} />
							))}
						</Flex>
					</SimpleGrid>
				) : (
					<Flex w={'full'} justifyContent={'center'} alignItems={'center'}>
						<Text fontSize={'2xl'} fontWeight={'bold'} color={'primary.700'}>
							No hay postulaciones
						</Text>
					</Flex>
				)}

				<Flex position={'absolute'} bottom={0}>
					<Footer />
				</Flex>
			</VStack>
		</>
	);
};

export default JobsApplied;
