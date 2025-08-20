import type { Address } from "viem";

import { useEffect, useState } from "react";

import { useKaiaWallet } from "./useKaiaWallet";

export const useKaiaAccount = () => {
	const { provider } = useKaiaWallet();

	const [currentAccount, setCurrentAccount] = useState<Address | undefined>(
		() => provider?.selectedAddress,
	);

	useEffect(() => {
		const handleAccountsChanged = (accounts: Address[]) => {
			setCurrentAccount(accounts[0]);
		};
		const handleDisconnect = () => {
			// disconnect 이후 다시 지갑 연결시 accountsChanged 이벤트가 호출되지 않음
			// 이 문제를 해결하기 위해 window 강제 새로고침
			window.location.reload();
		};
		// 이벤트 리스너 등록
		if (provider) {
			provider.on("accountsChanged", handleAccountsChanged);
			provider.on("disconnected", handleDisconnect);
		}

		// 클린업 함수
		return () => {
			if (provider) {
				provider.removeListener("accountsChanged", handleAccountsChanged);
				provider.removeListener("disconnected", handleDisconnect);
			}
		};
	}, [provider]);

	return {
		currentAccount,
	};
};
