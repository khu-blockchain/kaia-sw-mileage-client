import type { WalletLost } from "./types";

type CheckHasPendingWalletLostResponse = {
	result: boolean;
	data: WalletLost | null;
};

type CreateWalletLostRequest = {
	targetAddress: string;
};

type CreateWalletLostResponse = WalletLost;

export type {
	CheckHasPendingWalletLostResponse,
	CreateWalletLostRequest,
	CreateWalletLostResponse,
};
