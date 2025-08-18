import type {
	ConfirmWalletChangeRequest,
	CreateWalletChangeRequest,
} from "@/shared/api/student";
import type { CreateWalletLostRequest } from "@/shared/api/wallet-lost";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { walletLostQueries } from "@entities/wallet-lost";
import { studentApi } from "@/shared/api/student";
import { walletLostApi } from "@/shared/api/wallet-lost";

export const useCreateWalletChange = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: CreateWalletChangeRequest) => {
			const { data } = await studentApi.createWalletChange(request);
			queryClient.invalidateQueries(
				walletLostQueries.getCheck(request.studentHash),
			);
			return data;
		},
	});
};

export const useConfirmWalletChange = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: ConfirmWalletChangeRequest) => {
			const { data } = await studentApi.confirmWalletChange(request);
			queryClient.invalidateQueries(
				walletLostQueries.getCheck(request.studentHash),
			);
			return data;
		},
	});
};

export const useCreatWalletLost = () => {
	// const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: CreateWalletLostRequest) => {
			const { data } = await walletLostApi.creatWalletLost(request);
			return data;
		},
	});
};
