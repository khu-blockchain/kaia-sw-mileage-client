export const rankQueries = {
	all: () => ["rank"] as const,
	list: () => [...rankQueries.all(), "list"] as const,
};
