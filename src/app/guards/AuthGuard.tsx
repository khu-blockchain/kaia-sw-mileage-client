import type { FallbackProps } from "react-error-boundary";

import { Suspense } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet } from "react-router";

import { authApi } from "@/shared/api";
import { useAuthStore } from "@/shared/authorize";

const useRefresh = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);

	return useSuspenseQuery({
		queryKey: ["refresh"],
		queryFn: async () => {
			const { data } = await authApi.refreshToken();
			setAccessToken(data.access_token);
			return data;
		},
		retry: false,
	});
};

function AuthGuardInner() {
	useRefresh();
	return <Outlet />;
}

function AuthGuardFallback(FallbackProps: FallbackProps) {
	console.log(FallbackProps);
	return <Navigate to="/sign-in" />;
}

export default function AuthGuard() {
	return (
		<Suspense fallback={<></>}>
			<ErrorBoundary FallbackComponent={AuthGuardFallback}>
				<AuthGuardInner />
			</ErrorBoundary>
		</Suspense>
	);
}
