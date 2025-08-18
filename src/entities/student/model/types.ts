import type { TRANSACTION_STATUS } from "@/shared/api";

export interface Student {
	studentId: string;
	name: string;
	department: string;
	walletAddress: string;
	email: string;
	transactionStatus: TRANSACTION_STATUS;
	bankCode: string;
	bankAccountNumber: string;
	// personalInformationConsent: boolean;
	// personalInformationConsentDate: Date;
	studentHash: string;
	createdAt: string;
	updatedAt: string;
}
