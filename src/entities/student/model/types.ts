import type { TRANSACTION_STATUS } from "@/shared/api";

export interface Student {
	id: string;
	name: string;
	department: string;
	walletAddress: string;
	transactionStatus: TRANSACTION_STATUS;
	bankCode: string;
	bankAccountNumber: string;
	// personalInformationConsent: boolean;
	// personalInformationConsentDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
