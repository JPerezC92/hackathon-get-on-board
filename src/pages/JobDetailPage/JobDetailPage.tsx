import Layout from '@/layout';
import { Box, Button, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiMoney } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Datum } from '../../models';
import { LSKeys } from '../../utilities/localStorageKeys';
import { webRoutes } from '../../utilities/web.routes';

export const JobDetailPage: React.FC = () => {
	const jobStoraged = JSON.parse(window.localStorage.getItem(LSKeys.jobDetail) as string) as Datum;
	const navigate = useNavigate();
	const dataJob = jobStoraged.attributes;
	const applyPage = webRoutes.apply;

	return (
		<Layout>
			<Flex as="main" p="4" flexDirection="column" gap="4" maxWidth="container.lg" marginInline="auto">
				<Grid as="header" gridTemplateColumns="auto 1fr auto" gap="4">
					{jobStoraged ? <Box as="img" src={`${dataJob.company?.data?.attributes?.logo}`} w="24" /> : null}

					<Box>
						<Heading as="h1" color="primary.700">
							{dataJob.title}
						</Heading>

						<Text fontSize="sm" color="primary-ligth.600" fontWeight="medium">
							{dataJob.company.data.attributes.name} - {dataJob.company?.data?.attributes?.country} (
							{jobStoraged?.attributes.country}) ·{' '}
							<Box as="span" whiteSpace="nowrap">
								<Box as="i" verticalAlign="middle">
									<Icon as={BiMoney} fontSize="2xl" />
								</Box>
								{dataJob.min_salary} - {dataJob.max_salary}
							</Box>{' '}
							·{' '}
							<Box as="span" whiteSpace="nowrap">
								{dataJob.applications_count} solicitudes
							</Box>
						</Text>
					</Box>

					<Button
						bgColor={'secondary.300'}
						_hover={{
							backgroundColor: 'secondary.400',
						}}
						_active={{
							backgroundColor: 'secondary.400',
						}}
						onClick={() => navigate(applyPage)}
					>
						Aplicar Ahora
					</Button>
				</Grid>

				<Box as="section">
					<Text mb="4" color="special2.800" fontWeight="medium">
						{dataJob.company.data.attributes.description}
					</Text>
				</Box>

				<Box as="section" display={!dataJob.projects ? 'none' : 'block'}>
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
						dangerouslySetInnerHTML={{ __html: dataJob.projects }}
					/>
				</Box>

				<Box as="section" display={!dataJob.functions ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600" display="flex" alignItems="center">
						{dataJob.functions_headline}{' '}
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
						dangerouslySetInnerHTML={{ __html: dataJob.functions }}
					/>
				</Box>

				<Box as="section" display={!dataJob.desirable ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						{dataJob.desirable_headline}
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
						dangerouslySetInnerHTML={{ __html: dataJob.desirable }}
					/>
				</Box>

				<Box as="section" display={!dataJob.description ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						{dataJob.description_headline}
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
						dangerouslySetInnerHTML={{ __html: dataJob.description }}
					/>
				</Box>

				<Box as="section" display={!dataJob.benefits ? 'none' : 'block'}>
					<Heading as="h2" size="lg" color="primary.600">
						{dataJob.benefits_headline}
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
						dangerouslySetInnerHTML={{ __html: dataJob.benefits }}
					/>
				</Box>
			</Flex>
		</Layout>
	);
};
