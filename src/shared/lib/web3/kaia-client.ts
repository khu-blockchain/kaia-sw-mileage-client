import {
	createPublicClient,
	createWalletClient,
	custom,
	http,
	kairos,
} from "@kaiachain/viem-ext";

// Fallback RPC URL (테스트넷)
const KAIROS_RPC_URL = import.meta.env.VITE_NETWORK_RPC_URL;

const provider = window.klaytn;

const isKaiaWalletAvailable = (): boolean => {
	return typeof window !== "undefined" && !!window.klaytn;
};

// wallet이 없을 때는 HTTP transport 사용
const getTransport = () => {
	if (isKaiaWalletAvailable()) {
		return custom(window.klaytn!);
	}
	return http(KAIROS_RPC_URL);
};

const publicClient = createPublicClient({
	chain: kairos,
	transport: getTransport(),
});

// wallet client는 wallet이 있을 때만 생성
const walletClient = createWalletClient({
	chain: kairos,
	transport: getTransport(),
});

const kaia = {
	wallet: walletClient,
	public: publicClient,
	browserProvider: provider,
};

export { kaia };
