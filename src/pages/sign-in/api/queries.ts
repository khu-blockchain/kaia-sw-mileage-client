import type { SignInRequest } from "@/shared/api";

import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@shared/authorize";
import { authApi } from "@/shared/api";

export const useStudentSignIn = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const { data } = await authApi.signIn(request);

			const { access_token, ...student } = data;
			setAccessToken(access_token);
			return student;
		},
	});
};
