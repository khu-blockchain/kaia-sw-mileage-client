import type { SignInRequest } from "@/shared/api/auth";

import { useMutation } from "@tanstack/react-query";

import { mapStudent, useStudentStore } from "@entities/student";
import { useAuthStore } from "@shared/authorize";
import { authApi } from "@/shared/api/auth";

export const useStudentSignIn = () => {
	const { actions: studentActions } = useStudentStore();
	const { actions: authActions } = useAuthStore();

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const { data } = await authApi.signIn(request);

			const { access_token, ...student } = data;

			authActions.setAccessToken(access_token.token);
			studentActions.setStudent(mapStudent(student));

			return mapStudent(student);
		},
	});
};
