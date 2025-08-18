type WalletLostResponse = {
	id: number;
	student_id: string;
	student_name: string;
  student_hash: string;
	previous_wallet_address: string;
	request_wallet_address: string;
	created_at: Date;
	updated_at: Date;
};

type CheckHasPendingWalletLostResponse = {
	result: boolean;
	data: WalletLostResponse | null;
};

type CreateWalletLostRequest = {
  targetAddress: string;
};

type CreateWalletLostResponse = WalletLostResponse

export type {
	WalletLostResponse,
	CheckHasPendingWalletLostResponse,
	CreateWalletLostRequest,
	CreateWalletLostResponse,
};
