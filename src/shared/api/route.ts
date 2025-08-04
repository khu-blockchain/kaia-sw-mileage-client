import type { KyInstance } from "ky";

import { apiClient, authClient } from "./client";

const baseURL = import.meta.env.VITE_API_URL;

const server = (api: KyInstance) => (route: string) => {
	return api.extend({
		prefixUrl: `${baseURL}${route}`,
	});
};

const baseServer = server(apiClient);
const authServer = server(authClient);

const AuthServer = baseServer("auth");
const StudentServer = authServer("student");
const MileageServer = authServer("mileage");
const MileageTokenServer = authServer("mileage-token");
const MileageRubricServer = baseServer("mileage-rubric");
const MileagePointHistoryServer = authServer("mileage-point-history");
const WalletLostServer = authServer("wallet-lost");

export {
	AuthServer,
	StudentServer,
	MileageServer,
	MileageTokenServer,
	MileageRubricServer,
	MileagePointHistoryServer,
	WalletLostServer,
};
