import type { Options } from "ky";

import ky from "ky";

import { useAuthStore } from "../authorize";
import { authApi } from "./auth";

function beforeRequest(request: Request) {
	const token = useAuthStore.getState().actions.getAccessToken();
	if (token) {
		request.headers.set("Authorization", `Bearer ${token}`);
	}
};

async function afterResponse(request: Request, options: Options, response: Response) {
	if (response.status === 401) {
		try {
			const { data } = await authApi.refreshToken();
			const { access_token } = data;
			useAuthStore.getState().actions.setAccessToken(access_token.token);
			if (access_token.token) {
				request.headers.set("Authorization", `Bearer ${access_token.token}`);
				return ky(request);
			}
		} catch (error) {
			if (typeof window !== "undefined") {
				window.location.href = "/sign-in";
			}
			useAuthStore.getState().actions.clearAccessToken();
			console.error("Token refresh failed:", error);
		}
	}
	return response;
};

export { beforeRequest, afterResponse };
