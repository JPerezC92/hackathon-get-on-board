import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CategoriesJobs, Companies, CompaniesJobs, Seniorities } from '@/models';
import { Category } from '@/models/category.model';
import { getCategories, getCompanies, getSeniorities } from '@/services';

interface ContextSearchProps {
	inputSearch: string;
	setInputSearch: React.Dispatch<React.SetStateAction<string>>;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	search: string;
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;

	setResultsCompanies: React.Dispatch<React.SetStateAction<CompaniesJobs>>;
	setResultsCategories: React.Dispatch<React.SetStateAction<CategoriesJobs>>;

	resultsCategories: CategoriesJobs;
	resultsCompanies: CompaniesJobs;

	categories: Category[];
	companies: Companies;
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	setCompanies: React.Dispatch<React.SetStateAction<Companies>>;

	setPage: React.Dispatch<React.SetStateAction<number>>;
	setPerPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	perPage: number;

	error: boolean;
	loading: boolean;
	setError: React.Dispatch<React.SetStateAction<boolean>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;

	setSeniorityState: React.Dispatch<
		React.SetStateAction<
			{
				id: string;
				seniority: string;
			}[]
		>
	>;

	seniorityState: {
		id: string;
		seniority: string;
	}[];

	filterCategories: () => Promise<void>;
	filterCompanies: () => Promise<void>;
	seniorityCode: () => Promise<void>;
	resetPagination: () => void;
	resetAndClearCategories: () => void;
	resetAndClearCompanies: () => void;
}

export interface PropsChildren {
	children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

const SearchContext = createContext<ContextSearchProps>({} as ContextSearchProps);

export const SearchProvider = ({ children }: PropsChildren) => {
	const [categories, setCategories] = useState([] as Category[]);
	const [companies, setCompanies] = useState({} as Companies);

	const [seniorityState, setSeniorityState] = useState<{ id: string; seniority: string }[]>([
		{ id: '1', seniority: 'Sin experiencia' },
		{ id: '2', seniority: 'Junior' },
		{ id: '3', seniority: 'Semi Senior' },
		{ id: '4', seniority: 'Senior' },
		{ id: '5', seniority: 'Expert' },
	]);

	const [search, setSearch] = useState<string>('programming');
	const [filter, setFilter] = useState<string>('categories');
	const [inputSearch, setInputSearch] = useState<string>('');

	const [resultsCategories, setResultsCategories] = useState({} as CategoriesJobs);
	const [resultsCompanies, setResultsCompanies] = useState({} as CompaniesJobs);

	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);

	const [error, setError] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);

	const resetPagination = () => {
		setPerPage(10);
		setPage(1);
	};

	const resetAndClearCategories = () => {
		setInputSearch('');
		setFilter('categories');
		setSearch('programming');
	};

	const resetAndClearCompanies = () => {
		setInputSearch('');
		setSearch('ionix-spa');
		setFilter('companies');
	};

	const filterCategories = async () => {
		setLoading(true);
		try {
			setLoading(false);
			const result = await getCategories();
			setCategories(result);
			setError(false);
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	};

	const filterCompanies = async () => {
		setLoading(true);
		try {
			const result = await getCompanies();
			setCompanies(result);
			setLoading(false);
			setError(false);
		} catch (error) {
			setLoading(false);
			setError(true);
		}
	};

	const seniorityCode = async () => {
		setLoading(true);
		try {
			await getSeniorities().then((res) => {
				setSeniorityState(res.data.map((el) => ({ id: el.id, seniority: el.attributes.name })));
			});
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(false);
		}
	};

	useEffect(() => {
		resetAndClearCategories();
		filterCategories();
	}, []);

	return (
		<SearchContext.Provider
			value={
				{
					loading,
					setLoading,
					setError,
					error,
					page,
					perPage,
					setPerPage,
					setPage,
					search,
					setSearch,
					filter,
					inputSearch,
					setInputSearch,
					setResultsCategories,
					setResultsCompanies,
					resultsCategories,
					resultsCompanies,
					categories,
					companies,
					filterCategories,
					filterCompanies,
					resetPagination,
					resetAndClearCompanies,
					resetAndClearCategories,
					seniorityCode,
					setSeniorityState,
					seniorityState,
				} as ContextSearchProps
			}
		>
			{children}
		</SearchContext.Provider>
	);
};

export function useSearch() {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error('useSearch must be used whitin a SearchProvider');
	}

	return context;
}
