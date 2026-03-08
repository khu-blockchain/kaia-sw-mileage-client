import type { APIPromise } from "../types";
import type {
	ConfirmWalletChangeRequest,
	ConfirmWalletChangeResponse,
	CreateWalletChangeRequest,
	CreateWalletChangeResponse,
	GetMeResponse,
	SignUpRequest,
	SignUpResponse,
} from "./dto";

import { StudentServer } from "../route";

export const studentApi = {
	signUp: (request: SignUpRequest): APIPromise<SignUpResponse> =>
		StudentServer.post("", {
			json: request,
		}).json(),

	getMe: (): APIPromise<GetMeResponse> => StudentServer.get("me").json(),

	createWalletChange: (
		request: CreateWalletChangeRequest,
	): APIPromise<CreateWalletChangeResponse> =>
		StudentServer.post("wallet-change/create", {
			json: request,
		}).json(),

	confirmWalletChange: (
		request: ConfirmWalletChangeRequest,
	): APIPromise<ConfirmWalletChangeResponse> =>
		StudentServer.post("wallet-change/confirm", {
			json: request,
		}).json(),
};
