import { createWalletClient, custom, http, kairos } from "@kaiachain/viem-ext";
import { createPublicClient } from "viem";

const KAIROS_RPC_URL = "https://public-en-kairos.node.kaia.io";

export const useKaiaClient = () => {
	const publicClient = createPublicClient({
		chain: kairos,
		transport: http(KAIROS_RPC_URL),
	});

	const createBrowserWalletClient = (provider: any) => {
		if (!provider) {
			throw new Error("Kaia Wallet Extension이 설치되어 있지 않습니다.");
		}
		return createWalletClient({
			chain: kairos,
			transport: custom(provider),
		});
	};

	return { publicClient, createBrowserWalletClient };
};
