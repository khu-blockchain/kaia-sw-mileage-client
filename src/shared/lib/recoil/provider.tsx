import type { RecoilState, RecoilValue } from "recoil";

import {
	useGetRecoilValueInfo_UNSTABLE,
	useRecoilCallback,
	useRecoilTransaction_UNSTABLE,
} from "recoil";

import { recoilBridge } from "./helper";

export default function RecoilProvider() {
	recoilBridge.get = useRecoilCallback<[atom: RecoilValue<any>], any>(
		({ snapshot }) =>
			function <T>(atom: RecoilValue<T>) {
				return snapshot.getLoadable(atom).contents;
			},
		[],
	);

	const getInfo = useGetRecoilValueInfo_UNSTABLE();
	const transact = useRecoilTransaction_UNSTABLE(({ set }) => set);

	recoilBridge.set = useRecoilCallback(({ set }) => {
		return function <T>(
			recoilState: RecoilState<T>,
			valOrUpdater: T | ((currVal: T) => T),
		) {
			const update = {
				atom: transact,
				selector: set,
			}[getInfo(recoilState).type];

			update(recoilState, valOrUpdater);
		};
	}, []) as <T>(
		atom: RecoilState<T>,
		valOrUpdater: T | ((currVal: T) => T),
	) => void;

	recoilBridge.reset = useRecoilCallback(({ reset }) => reset, []);

	return null;
}
