import { useMemo } from "react";

import { createWalletClient, custom, http, kairos } from "@kaiachain/viem-ext";
import { createPublicClient } from "viem";

const KAIROS_RPC_URL = "https://public-en-kairos.node.kaia.io";

export const useKaiaClient = () => {
	const provider = window.klaytn;

	const publicClient = createPublicClient({
		chain: kairos,
		transport: http(KAIROS_RPC_URL),
	});

	// wallet client는 kaia wallet extension이 설치되어야지만 활성화됩니다.
	const walletClient = useMemo(() => {
		if (!provider) {
			return null;
		}
		return createWalletClient({
			chain: kairos,
			transport: custom(provider!),
		});
	}, [provider]);

	return { publicClient, walletClient };
};
