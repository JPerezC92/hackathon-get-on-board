import { useAuth } from '@/context/AuthProvider';
import Layout from '@/layout';
import { getJob } from '@/services';
import { webRoutes } from '@/utilities/web.routes';
import { Box, Button, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiMoney } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../models/job.model';
import { LSKeys } from '../../utilities/localStorageKeys';
import { useParams } from 'react-router-dom';

export const JobDetailPage: React.FC = () => {
	const [isApplied, setIsApplied] = useState<boolean|null>(null);
	const { user } = useAuth();
	const { id: jobId } = useParams<{ id: string }>();
	console.log(jobId);
	useEffect(() => {
		if (user && jobId) {getJob(user.uid, jobId).then(() => setIsApplied(true)).catch(() => setIsApplied(false))};
		if (user===null) {setIsApplied(false)};
	}, [!!user]);

	const jobStoraged = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Job;
	const navigate = useNavigate();
	return (
		<Layout>
			<Flex as="main" p="4" flexDirection="column" gap="4" maxWidth="container.lg" marginInline="auto">
				<Grid as="header" gridTemplateColumns="auto 1fr auto" gap="4">
					{jobStoraged ? <Box as="img" src={`${jobStoraged.company?.logo}`} w="24" /> : null}

					<Box>
						<Heading as="h1" color="primary.700">
							{jobStoraged.title}
						</Heading>

						<Text fontSize="sm" color="primary-ligth.600" fontWeight="medium">
							{jobStoraged.company.name} - {jobStoraged.company?.country} ({jobStoraged?.country}) ·{' '}
							<Box as="span" whiteSpace="nowrap">
								<Box as="i" verticalAlign="middle">
									<Icon as={BiMoney} fontSize="2xl" />
								</Box>
								{jobStoraged.min_salary} - {jobStoraged.max_salary}
							</Box>{' '}
							·{' '}
							<Box as="span" whiteSpace="nowrap">
								{jobStoraged.applications_count} solicitudes
							</Box>
						</Text>
					</Box>

					{isApplied === false ? (
						<Button
							bgColor={'secondary.300'}
							_hover={{
								backgroundColor: 'secondary.400',
							}}
							_active={{
								backgroundColor: 'secondary.400',
							}}
							onClick={() => navigate(webRoutes.apply)}
						>
							Aplicar Ahora
						</Button>
					) : isApplied === true ?(
						<Text fontSize="lg" color="primary-ligth.600" fontWeight="medium"	
						>
							Ya aplicaste!
						</Text>
					): null}
				</Grid>

				<Box as="section">
					<Text mb="4" color="special2.800" fontWeight="medium">
						{jobStoraged.company.description}
					</Text>
				</Box>

				<Box as="section" display={!jobStoraged.projects ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						Proyectos
					</Heading>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />

					<Box
						listStyleType="disc"
						color="special2.800"
						css={{
							['& > ul > li, & > ol > li']: { marginLeft: '2rem' },
							'& > p': { marginBlockEnd: '1rem' },
							'& > ul, & > ol': { marginBlockEnd: '1rem' },
						}}
						fontWeight="medium"
						dangerouslySetInnerHTML={{ __html: jobStoraged.projects }}
					/>
				</Box>

				<Box as="section" display={!jobStoraged.functions ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600" display="flex" alignItems="center">
						{jobStoraged.functions_headline}{' '}
					</Heading>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />

					<Box
						listStyleType="disc"
						color="special2.800"
						css={{
							['& > ul > li, & > ol > li']: { marginLeft: '2rem' },
							'& > p': { marginBlockEnd: '1rem' },
							'& > ul, & > ol': { marginBlockEnd: '1rem' },
						}}
						fontWeight="medium"
						dangerouslySetInnerHTML={{ __html: jobStoraged.functions }}
					/>
				</Box>

				<Box as="section" display={!jobStoraged.desirable ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						{jobStoraged.desirable_headline}
					</Heading>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />

					<Box
						listStyleType="disc"
						color="special2.800"
						css={{
							['& > ul > li, & > ol > li']: { marginLeft: '2rem' },
							'& > p': { marginBlockEnd: '1rem' },
							'& > ul, & > ol': { marginBlockEnd: '1rem' },
						}}
						fontWeight="medium"
						dangerouslySetInnerHTML={{ __html: jobStoraged.desirable }}
					/>
				</Box>

				<Box as="section" display={!jobStoraged.description ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						{jobStoraged.description_headline}
					</Heading>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />

					<Box
						listStyleType="disc"
						color="special2.800"
						fontWeight="medium"
						css={{
							['& > ul > li, & > ol > li']: { marginLeft: '2rem' },
							'& > p': { marginBlockEnd: '1rem' },
							'& > ul, & > ol': { marginBlockEnd: '1rem' },
						}}
						dangerouslySetInnerHTML={{ __html: jobStoraged.description }}
					/>
				</Box>

				<Box as="section" display={!jobStoraged.benefits ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						{jobStoraged.benefits_headline}
					</Heading>

					<Box as="hr" borderColor="neutral-light.600" marginBlockEnd="4" marginBlockStart="2" />

					<Box
						listStyleType="disc"
						color="special2.800"
						fontWeight="medium"
						css={{
							['& > ul > li, & > ol > li']: { marginLeft: '2rem' },
							'& > p': { marginBlockEnd: '1rem' },
							'& > ul, & > ol': { marginBlockEnd: '1rem' },
						}}
						dangerouslySetInnerHTML={{ __html: jobStoraged.benefits }}
					/>
				</Box>
			</Flex>
		</Layout>
	);
};
