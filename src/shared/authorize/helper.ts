import { getRecoil, resetRecoil, setRecoil } from "@shared/lib/recoil";

import { accessTokenState } from "./store";

export const getAuthTokenStateExternal = () => getRecoil(accessTokenState);

export const setAuthTokenStateExternal = (token: string) =>
	setRecoil(accessTokenState, token);

export const resetAuthTokenStateExternal = () => resetRecoil(accessTokenState);
