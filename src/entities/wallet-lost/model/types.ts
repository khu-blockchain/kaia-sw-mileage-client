export interface WalletLost {
	id: number;
	studentId: string;
	studentName: string;
	studentHash: string;
	previousWalletAddress: string;
	requestWalletAddress: string;
	createdAt: Date;
	updatedAt: Date;
}
