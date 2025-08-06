import type { SignUpRequest } from "@/shared/api/student";

import { useMutation } from "@tanstack/react-query";

import { studentApi } from "@/shared/api/student";
import { mapStudent } from "@entities/student";

export const useStudentSignUp = () => {
	return useMutation({
		mutationFn: async (request: SignUpRequest) => {
			const { data } = await studentApi.signUp(request);
			return mapStudent(data);
		},
	});
};
