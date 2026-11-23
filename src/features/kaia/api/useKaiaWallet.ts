import { useMemo, useSyncExternalStore } from "react";

const subscribeNetwork = (onChange: () => void) => {
	const provider = window.klaytn;
	provider?.on("networkChanged", onChange);
	return () => provider?.removeListener("networkChanged", onChange);
};

const getNetworkSnapshot = () => window.klaytn?.networkVersion;

export const useKaiaWallet = () => {
	const provider = window.klaytn;
	const isInstalled = useMemo(() => !!provider, [provider]);
	const currentNetwork = useSyncExternalStore(
		subscribeNetwork,
		getNetworkSnapshot,
	);

	const switchToKairosNetwork = async () => {
		try {
			return await provider.request({
				method: "wallet_switchKlaytnChain",
				params: [{ chainId: "0x3e9" }],
			});
		} catch (error) {
			console.error(error);
		}
	};

	const connectKaiaWallet = async () => {
		await provider.enable();
	};

  

	return {
		provider,
		isInstalled,
		currentNetwork,
		switchToKairosNetwork,
		connectKaiaWallet,
	};
};
