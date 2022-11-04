import { Filters } from '@/components/FiltersV2';
import { SearchProvider } from '@/context/SearchContext';
import Layout from '@/layout';

const HomePage = () => {
	return (
		<Layout>
			<SearchProvider>
				<Filters />
			</SearchProvider>
		</Layout>
	);
};

export default HomePage;
