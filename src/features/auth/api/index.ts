import { API, AuthServer } from "@/features/_core/api";

import {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse,
} from "./type";

const signInAPI: API<signInAPIRequest, signInAPIResponse> = async (request) => {
  const { loginType, id, password } = request;

  try {
    const result = await AuthServer.post("login", {
      json: {
        loginType,
        id,
        password,
      },
    }).json();
    return result as signInAPIResponse;
  } catch (e) {
    throw e;
  }
};

const refreshAPI: API<refreshAPIRequest, refreshAPIResponse> = async (
  request
) => {
  const { refreshToken } = request;

  try {
    const result = await AuthServer.post("refresh-token", {
      json: { refreshToken },
    }).json();
    return result as refreshAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { signInAPI, refreshAPI };
