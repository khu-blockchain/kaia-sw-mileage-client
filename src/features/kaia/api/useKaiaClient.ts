import { createWalletClient, custom, http, kairos } from "@kaiachain/viem-ext";
import { createPublicClient } from "viem";

const KAIROS_RPC_URL = import.meta.env.VITE_NETWORK_RPC_URL;

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
