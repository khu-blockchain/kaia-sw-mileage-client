import { useEffect } from "react";

import { Navigate, Route, Routes, useLocation } from "react-router";

import { MileageHistoryPage } from "@/pages/mileage-history";
import { MileageHistoryDetailPage } from "@/pages/mileage-history-detail";
import { MileageInfoPage } from "@/pages/mileage-info";
import { MileageRegistrationPage } from "@/pages/mileage-registration";
import { RankPage } from "@/pages/rank";
import { SignInPage } from "@/pages/sign-in";
import { SignUpPage } from "@/pages/sign-up";
import { UserSettingPage } from "@/pages/user-setting";

import { AuthGuard, InitGuard } from "../guards";

export default function RootRouter() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [location.pathname]);

	return (
		<Routes>
			<Route element={<InitGuard />}>
				<Route path="sign-in" element={<SignInPage />} />
				<Route path="sign-up" element={<SignUpPage />} />
			</Route>
			<Route element={<AuthGuard />}>
				<Route>
					{/* <Route element={<MainLayout />}> */}
					<Route index path={"/"} element={<MileageInfoPage />} />
					<Route path="apply" element={<MileageRegistrationPage />} />
					<Route path="history/*">
						<Route index element={<MileageHistoryPage />} />
						<Route path=":id" element={<MileageHistoryDetailPage />} />
					</Route>
					<Route path="setting" element={<UserSettingPage />} />
					<Route path="ranking" element={<RankPage />} />
				</Route>
				<Route path="*" element={<Navigate to={"/"} />} />
			</Route>
		</Routes>
	);
}
