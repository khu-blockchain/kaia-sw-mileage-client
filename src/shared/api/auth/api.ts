import type { APIPromise } from "../types";
import type {
	RefreshTokenResponse,
	SignInRequest,
	SignInResponse,
} from "./dto";

import { AuthServer, AuthServerWithAccessToken } from "../route";

export const authApi = {
	signIn: (request: SignInRequest): APIPromise<SignInResponse> =>
		AuthServer.post("login/student", {
			credentials: "include",
			json: request,
		}).json(),

	refreshToken: (): APIPromise<RefreshTokenResponse> =>
		AuthServer.post("refresh", {
			credentials: "include",
		}).json(),

	logout: (): APIPromise<void> =>
		AuthServerWithAccessToken.post("logout", {
			credentials: "include",
		}).json(),
};
