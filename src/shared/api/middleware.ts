import type { Options } from "ky";

import ky from "ky";

import { useAuthStore } from "../authorize";
import { authApi } from "./auth";

function beforeRequest(request: Request) {
  const accessToken = useAuthStore.getState().getAccessToken();
	if (accessToken) {
		request.headers.set("Authorization", `Bearer ${accessToken}`);
	}
}

async function afterResponse(
	request: Request,
	_options: Options,
	response: Response,
) {
	if (response.status === 401) {
		try {
			const { data } = await authApi.refreshToken();
			const { access_token } = data;
			useAuthStore.getState().setAccessToken(access_token);
			if (access_token) {
				request.headers.set("Authorization", `Bearer ${access_token}`);
				return ky(request);
			}
		} catch (error) {
			if (typeof window !== "undefined") {
				window.location.href = "/sign-in";
			}
			useAuthStore.getState().setAccessToken(null);
			console.error("Token refresh failed:", error);
		}
	}
	return response;
}

export { beforeRequest, afterResponse };
