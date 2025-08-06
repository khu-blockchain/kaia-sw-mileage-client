import type { RecoilState, RecoilValue } from "recoil";

interface RecoilBridge {
	get?: <T>(atom: RecoilValue<T>) => T;
	set?: <T>(
		atom: RecoilState<T>,
		valOrUpdater: T | ((currVal: T) => T),
	) => void;
	reset?: (atom: RecoilState<any>) => void;
}

export const recoilBridge: RecoilBridge = {};

export function getRecoil<T>(atom: RecoilValue<T>): T {
	return recoilBridge.get!(atom);
}

export function setRecoil<T>(
	atom: RecoilState<T>,
	valOrUpdater: T | ((currVal: T) => T),
) {
	recoilBridge.set!(atom, valOrUpdater);
}

export function resetRecoil(atom: RecoilState<any>) {
	recoilBridge.reset!(atom);
}
