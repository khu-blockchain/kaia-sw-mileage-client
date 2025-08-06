import type { Options } from "ky";

import ky from "ky";

import {
	getAuthTokenStateExternal,
	resetAuthTokenStateExternal,
	setAuthTokenStateExternal,
} from "../authorize";

import { authApi } from "./auth";

function beforeRequest(request: Request) {
	const token = getAuthTokenStateExternal();
	if (token) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
}

async function afterResponse(
	request: Request,
	options: Options,
	response: Response,
) {
	if (response.status === 401) {
		try {
			const { data } = await authApi.refreshToken();
			const { access_token } = data;
			setAuthTokenStateExternal(access_token);
			if (access_token) {
				request.headers.set("Authorization", `Bearer ${access_token}`);
				return ky(request);
			}
		} catch (error) {
			if (typeof window !== "undefined") {
				window.location.href = "/sign-in";
			}
			resetAuthTokenStateExternal();
			console.error("Token refresh failed:", error);
		}
	}
	return response;
}

export { beforeRequest, afterResponse };
