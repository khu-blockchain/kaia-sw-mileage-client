import type { WalletLost } from "../model";

import { walletLostApi } from "@shared/api/wallet-lost";
import { STUDENT_MANAGER_ABI } from "@shared/config";
import { contractCall, ZERO_ADDRESS } from "@shared/lib/web3";

import { mapWalletLost } from "./mapper";

type useCheckHasWalletChangeProcessResponse =
	| hasWalletChangeProcessResponse
	| hasNotWalletChangeProcessResponse;

type hasNotWalletChangeProcessResponse = {
	result: false;
	data: null;
};

type hasWalletChangeProcessResponse = {
	result: true;
	data: walletChangeResponse | walletLostResponse;
};

type walletChangeResponse = {
	type: "WALLET_CHANGE";
	data: {
		createdAt: bigint;
		targetAccount: string;
	};
};

type walletLostResponse = {
	type: "WALLET_LOST";
	data: WalletLost | null;
};

export const walletLostQueries = {
	all: () => ["wallet-lost"] as const,
	check: (studentHash: string) =>
		[...walletLostQueries.all(), "check", studentHash] as const,
	getCheck: (studentHash: string) => ({
		queryKey: walletLostQueries.check(studentHash),
		queryFn: async (): Promise<useCheckHasWalletChangeProcessResponse> => {
			const {
				data: { result, data },
			} = await walletLostApi.checkHasPendingWalletLost();
			console.log(result, data);
			if (result) {
				return {
					result: true,
					data: {
						type: "WALLET_LOST",
						data: data ? mapWalletLost(data) : null,
					},
				};
			}
			const { createdAt, targetAccount } = (await contractCall(
				import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
				STUDENT_MANAGER_ABI,
				"getPendingAccountChange",
				[studentHash],
			)) as { createdAt: bigint; targetAccount: string };

			if (targetAccount !== ZERO_ADDRESS) {
				return {
					result: true,
					data: {
						type: "WALLET_CHANGE",
						data: {
							createdAt,
							targetAccount,
						},
					},
				};
			}
			return {
				result: false,
				data: null,
			};
		},
		enabled: !!studentHash,
	}),
};
