import { queryOptions } from "@tanstack/react-query";

import { walletLostApi } from "@shared/api";

export const walletManageQueries = {
	all: () => ["wallet-manage"] as const,
	checkChange: (studentHash: string) =>
		[...walletManageQueries.all(), "check-change", studentHash] as const,
	checkLost: () => [...walletManageQueries.all(), "check-lost"] as const,

	getHasLostProcess: () =>
		queryOptions({
			queryKey: [...walletManageQueries.checkLost()],
			queryFn: async () => {
				const { data } = await walletLostApi.checkHasPendingWalletLost();
				return data;
			},
		}),
};
