export const studentQueries = {
	all: () => ["student"] as const,
	me: () => [...studentQueries.all(), "me"] as const,
};
