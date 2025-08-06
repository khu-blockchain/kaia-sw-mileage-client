import type { SignInRequest } from "@/shared/api/auth";

import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import { mapStudent, studentState } from "@entities/student";
import { accessTokenState } from "@shared/authorize";
import { authApi } from "@/shared/api/auth";

export const useStudentSignIn = () => {
	const setStudentState = useSetRecoilState(studentState);
	const setAccessTokenState = useSetRecoilState(accessTokenState);

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const { data } = await authApi.signIn(request);

			const { access_token, ...student } = data;

			setAccessTokenState(access_token);
			setStudentState(mapStudent(student));

			return mapStudent(student);
		},
	});
};
