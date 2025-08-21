import type { RegisterMileageRequest } from "@/shared/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mileageQueries } from "@entities/mileage";
import { mileageApi } from "@/shared/api";

export const useRegisterMileage = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (request: RegisterMileageRequest) => {
			const { data } = await mileageApi.registerMileage(request);

			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: mileageQueries.myMileages(),
			});
		},
	});
};
