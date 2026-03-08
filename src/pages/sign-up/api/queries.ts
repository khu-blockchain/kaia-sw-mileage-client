import type { SignUpRequest } from "@/shared/api";

import { useMutation } from "@tanstack/react-query";

import { studentApi } from "@/shared/api";

export const useStudentSignUp = () => {
	return useMutation({
		mutationFn: async (request: SignUpRequest) => {
			const { data } = await studentApi.signUp(request);
			return data;
		},
	});
};
