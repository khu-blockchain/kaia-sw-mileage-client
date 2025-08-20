export const walletLostQueries = {
	all: () => ["wallet-lost"] as const,
	check: (studentHash: string) =>
		[...walletLostQueries.all(), "check", studentHash] as const,
};
