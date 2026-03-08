import type { APIPromise } from "../types";
import type {
	CheckHasPendingWalletLostResponse,
	CreateWalletLostRequest,
	CreateWalletLostResponse,
} from "./dto";

import { WalletLostServer } from "../route";

export const walletLostApi = {
	checkHasPendingWalletLost:
		(): APIPromise<CheckHasPendingWalletLostResponse> =>
			WalletLostServer.get("check").json(),

	creatWalletLost: (
		request: CreateWalletLostRequest,
	): APIPromise<CreateWalletLostResponse> =>
		WalletLostServer.post("", {
			json: request,
		}).json(),
};
