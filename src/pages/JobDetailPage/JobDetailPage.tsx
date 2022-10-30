import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { JobEndpoint } from '../../models/job.model';
import { job } from './job';

// type JobDetailPageProps = {};

// type JobDetailPageParams = {
// 	id: string;
// };

export const JobDetailPage: React.FC = () => {
	window.localStorage.setItem('job', JSON.stringify(job));

	const jobStoraged = JSON.parse(window.localStorage.getItem('job')!) as JobEndpoint;

	const { attributes } = jobStoraged;

	// const params = ReactRouter.useParams<JobDetailPageParams>();
	// useQuery(['qqq', params], () => {
	// 	axios.get('node-js-developer-con-react-leniolabs_-remote-8cc7');
	// 	return [];
	// });

	console.log(attributes);

	return (
		<Box as="main" p="4">
			<Heading>{attributes.title}</Heading>

			<Text>Aplicaciones: {attributes.applications_count}</Text>
			<Text>Categoria: {attributes.category_name}</Text>
			<Text>Min salary: {attributes.min_salary}</Text>
			<Text>Max salary: {attributes.max_salary}</Text>
			<Text>Pais: {attributes.country}</Text>
			<Text>Seniority: {attributes.seniority.data.type}</Text>

			<div>
				<Heading>{attributes.description_headline}</Heading>
				<Box listStyleType="disc" marginInlineStart="8" dangerouslySetInnerHTML={{ __html: attributes.description }} />
			</div>

			<div>
				<Heading>{attributes.benefits_headline}</Heading>
				<Text dangerouslySetInnerHTML={{ __html: attributes.benefits }} />
			</div>

			<div>
				<Heading>Proyectos</Heading>
				<Text dangerouslySetInnerHTML={{ __html: attributes.projects }} />
			</div>
			<div>
				<Heading>{attributes.desirable_headline}</Heading>
				<Text dangerouslySetInnerHTML={{ __html: attributes.desirable }} />
			</div>

			<div>
				<Heading>Functions</Heading>
				<Text dangerouslySetInnerHTML={{ __html: attributes.functions }} />
			</div>
		</Box>
	);
};
