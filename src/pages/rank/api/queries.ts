import type { ContractAddress } from "@shared/lib/web3";

import { STUDENT_MANAGER_ABI, SW_MILEAGE_TOKEN_ABI } from "@shared/config";
import { contractCall } from "@shared/lib/web3";

export const rankQueries = {
	all: () => ["rank"] as const,
	list: () => [...rankQueries.all(), "list"] as const,
	getList: () => ({
		queryKey: rankQueries.list(),
		queryFn: async () => {
			const swMileageToken = (await contractCall(
				import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
				STUDENT_MANAGER_ABI,
				"mileageToken",
				[],
			)) as ContractAddress;

			const point = await contractCall(
				swMileageToken,
				SW_MILEAGE_TOKEN_ABI,
				"getRankingRange",
				[1, 20],
			);
			return point;
		},
	}),
};
