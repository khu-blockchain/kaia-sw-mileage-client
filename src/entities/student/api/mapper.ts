import type { StudentResponse } from "@shared/api/student";
import type { Student } from "../model";

export const mapStudent = (dto: StudentResponse): Student => {
	return {
		id: dto.id,
		name: dto.name,
		department: dto.department,
		walletAddress: dto.wallet_address,
		transactionStatus: dto.transaction_status,
		bankCode: dto.bank_code,
		bankAccountNumber: dto.bank_account_number,
		// personalInformationConsent: dto.personal_information_consent,
		// personalInformationConsentDate: new Date(dto.personal_information_consent_date),
		createdAt: new Date(dto.created_at),
		updatedAt: new Date(dto.updated_at),
	};
};
