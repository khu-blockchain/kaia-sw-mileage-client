import type { RegisterMileageRequest } from "@/shared/api/mileage";

import { useMutation } from "@tanstack/react-query";

import { mileageApi } from "@/shared/api/mileage";

export const useRegisterMileage = () => {
	return useMutation({
		mutationFn: async (request: RegisterMileageRequest) => {
			const { data } = await mileageApi.registerMileage(request);
			return data;
		},
	});
};
