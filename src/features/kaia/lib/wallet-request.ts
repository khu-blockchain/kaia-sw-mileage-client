import { toast } from "sonner";

const WALLET_REQUEST_TOAST_ID = "kaia-wallet-request";
// 이미 연결된 상태처럼 지갑 창 없이 바로 끝나는 요청에는 토스트를 띄우지 않는다.
const WALLET_REQUEST_TOAST_DELAY_MS = 500;

let pendingRequests = 0;

// 지갑 창이 다른 창 뒤에 열려도 사용자가 알 수 있도록, 요청이 끝날 때까지 안내 토스트를 띄운다.
export const withWalletRequestToast = async <T>(
	request: () => Promise<T>,
): Promise<T> => {
	pendingRequests += 1;
	const timer = setTimeout(() => {
		toast.loading("Kaia Wallet 창에서 요청을 확인해주세요.", {
			id: WALLET_REQUEST_TOAST_ID,
			position: "top-center",
		});
	}, WALLET_REQUEST_TOAST_DELAY_MS);

	try {
		return await request();
	} finally {
		clearTimeout(timer);
		pendingRequests -= 1;
		if (pendingRequests === 0) {
			toast.dismiss(WALLET_REQUEST_TOAST_ID);
		}
	}
};
