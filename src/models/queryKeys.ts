export const queryKeys = {
	search: ['search'] as const,
	categories: ['categories'] as const,
	companies: ['companies'] as const,
	searchJobQuery: (query: string, page: number, perPage: number) =>
		[...queryKeys.search, query, page, perPage] as const,
	categoryJobQuery: (query: string, page: number, perPage: number) =>
		[...queryKeys.categories, query, page, perPage] as const,
	companyJobQuery: (query: string, page: number, perPage: number) =>
		[...queryKeys.categories, query, page, perPage] as const,
	// lists: () => [...queryKeys.all, 'list'] as const,
	// list: (filters: string) => [...queryKeys.lists(), { filters }] as const,
	// details: () => [...queryKeys.all, 'detail'] as const,
	// detail: (id: number) => [...queryKeys.details(), id] as const,
};
