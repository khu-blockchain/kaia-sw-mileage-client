import type { SignUpRequest } from "@/shared/api/student";

import { useMutation } from "@tanstack/react-query";

import { studentApi } from "@/shared/api/student";

export const useStudentSignUp = () => {
	return useMutation({
		mutationFn: async (request: SignUpRequest) =>
			await studentApi.signUp(request),
	});
};
