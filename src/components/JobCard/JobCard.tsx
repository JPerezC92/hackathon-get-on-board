import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { IoMdWifi } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Job } from '../../models/Job';
import { perksIcons } from './perksIcons';
interface JobCardProps {
	job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
	const navigate = useNavigate();

	return (
		<Box
			as="button"
			onClick={() => {
				window.localStorage.setItem('job', JSON.stringify(job));
				navigate('/jobs');
			}}
			border="1px"
			borderColor="gray.300"
			borderRadius="xl"
			display="flex"
			flexDirection="column"
			backgroundColor="primary-ligth.400"
		>
			<Text
				as="span"
				color="#fff"
				display="inline-flex"
				fontWeight="medium"
				gap="1"
				marginInlineEnd="2"
				marginInlineStart="auto"
				alignItems="center"
				my="2"
			>
				{job.remote ? (
					<>
						<Box as="i" display="contents">
							<Icon as={IoMdWifi} />
						</Box>
						({job.company.country})
					</>
				) : (
					<>
						<Box as={ReactCountryFlag} countryCode={job.company.country} svg fontSize="2xl" />
						<Box as="span">{job.country}</Box>
					</>
				)}
			</Text>

			<Box
				backgroundColor="white"
				border="1px"
				borderBlockStart="1px"
				borderColor="primary-ligth.400"
				borderRadius="xl"
				gap="2"
				height="full"
				paddingBottom="2"
				paddingInline="4"
				position="relative"
				width="full"
				display="flex"
				flexDirection="column"
			>
				<Box
					as="header"
					borderColor="gray.300"
					display="flex"
					justifyContent="space-between"
					gap="8"
					mt="1"
					marginBlockEnd="-1rem"
				>
					<Box
						transform="translateY(-2rem)"
						as="img"
						p="1"
						src={job.company.logo}
						alt={`${job.company.name} logo`}
						maxWidth="16"
						border="1px"
						borderColor="primary-ligth.100"
						bg="primary-ligth.50"
						borderRadius="md"
					/>

					<Text fontWeight="medium" fontSize="lg">
						{job.company.name}
					</Text>
				</Box>

				<Heading size="md" textAlign="left">
					{job.title}{' '}
					<Text as="small" fontWeight="medium" color="gray" whiteSpace="nowrap">
						{job.modality}
					</Text>
				</Heading>

				<Box mt="auto" display={['none', null, null, 'flex']} gap="2" flexWrap="wrap">
					{job.perks.slice(0, 6).map((perk) => (
						// <Tooltip key={p} label={p.name}>
						<Box as="i" key={perk}>
							<Icon as={perksIcons[perk]} width="6" height="6" color="gray.400" />
						</Box>
						// </Tooltip>
					))}
				</Box>
			</Box>
		</Box>
	);
};
