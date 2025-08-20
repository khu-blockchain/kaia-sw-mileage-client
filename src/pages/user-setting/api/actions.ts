import type {
	ConfirmWalletChangeRequest,
	CreateWalletChangeRequest,
	CreateWalletLostRequest,
} from "@/shared/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { studentApi, walletLostApi } from "@/shared/api";

import { walletLostQueries } from "./queries";

export const useCreateWalletChange = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: CreateWalletChangeRequest) => {
			const { data } = await studentApi.createWalletChange(request);
			queryClient.invalidateQueries({
				queryKey: walletLostQueries.check(request.studentHash),
			});
			return data;
		},
	});
};

export const useConfirmWalletChange = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: ConfirmWalletChangeRequest) => {
			const { data } = await studentApi.confirmWalletChange(request);
			queryClient.invalidateQueries({
				queryKey: walletLostQueries.check(request.studentHash),
			});
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
