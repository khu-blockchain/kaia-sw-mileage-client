import type { KyInstance } from "ky";

import { apiClient, authClient } from "./client";

// 운영: nginx, 개발: vite proxy가 /api/를 백엔드로 전달
const baseURL = "/api/v1/";

const server = (api: KyInstance) => (route: string) => {
	return api.extend({
		prefixUrl: `${baseURL}${route}`,
	});
};

const baseServer = server(apiClient);
const authServer = server(authClient);

const AuthServer = baseServer("auth");
const AuthServerWithAccessToken = authServer("auth");
const StudentServer = authServer("student");
const MileageServer = authServer("mileage");
const MileageTokenServer = authServer("mileage-token");
const MileageRubricServer = baseServer("mileage-rubric");
const MileagePointHistoryServer = authServer("mileage-point-history");
const WalletLostServer = authServer("wallet-lost");

export {
	AuthServer,
	AuthServerWithAccessToken,
	StudentServer,
	MileageServer,
	MileageTokenServer,
	MileageRubricServer,
	MileagePointHistoryServer,
	WalletLostServer,
};
