import { Suspense } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet } from "react-router";
import { useSetRecoilState } from "recoil";

import { studentState, mapStudent } from "@entities/student";
import { authApi } from "@/shared/api/auth";
import { accessTokenState } from "@/shared/authorize";

const useRefresh = () => {
	const setStudentState = useSetRecoilState(studentState);
	const setAccessTokenState = useSetRecoilState(accessTokenState);
  
	return useSuspenseQuery({
		queryKey: ["refresh"],
		queryFn: async () => {
			const { data } = await authApi.refreshToken();
			setStudentState(mapStudent(data));
			setAccessTokenState(data.access_token);
			return mapStudent(data);
		},
		retry: false,
	});
};

function AuthGuardInner() {
	useRefresh();
	return <Outlet />;
}

function AuthGuardFallback() {
	return <Navigate to="/sign-in" />;
}

export default function AuthGuard() {
	return (
		<Suspense fallback={<></>}>
			<ErrorBoundary FallbackComponent={() => <AuthGuardFallback />}>
				<AuthGuardInner />
			</ErrorBoundary>
		</Suspense>
	);
}
