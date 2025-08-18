import type { WalletLostResponse } from "@shared/api/wallet-lost";
import type { WalletLost } from "../model";

export const mapWalletLost = (dto: WalletLostResponse): WalletLost => {
	return {
		id: dto.id,
		studentId: dto.student_id,
		studentName: dto.student_name,
		studentHash: dto.student_hash,
		previousWalletAddress: dto.previous_wallet_address,
		requestWalletAddress: dto.request_wallet_address,
		createdAt: dto.created_at,
		updatedAt: dto.updated_at,
	};
};
