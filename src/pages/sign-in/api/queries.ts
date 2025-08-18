import type { SignInRequest } from "@/shared/api/auth";

import { useMutation } from "@tanstack/react-query";

import { mapStudent } from "@entities/student";
import { useAuthStore } from "@shared/authorize";
import { authApi } from "@/shared/api/auth";

export const useStudentSignIn = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const { data } = await authApi.signIn(request);

			const { access_token, ...student } = data;
			setAccessToken(access_token);
			return mapStudent(student);
		},
	});
};
