import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";

function Auth() {
	// useRefresh();
	return <Outlet />;
}

export default function AuthGuard() {
	// const { getStudent } = useStudentStore((state) => state.actions)
	// if (getStudent().student_id !== "") {
	// 	return <Outlet />
	// }
	return (
		<ErrorBoundary FallbackComponent={() => <></>}>
			{/* <ErrorBoundary FallbackComponent={AuthBoundary}></ErrorBoundary> */}
			<Suspense fallback={<></>}>
				<Auth />
			</Suspense>
		</ErrorBoundary>
	);
}
