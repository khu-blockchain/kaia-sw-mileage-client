import type { StudentResponse } from "@shared/api/student";
import type { Student } from "../model";

import { parseToFormattedDate } from "@shared/lib";

export const mapStudent = (dto: StudentResponse): Student => {
	return {
		studentId: dto.student_id,
		name: dto.name,
		department: dto.department,
		walletAddress: dto.wallet_address,
		email: dto.email,
		transactionStatus: dto.transaction_status,
		bankCode: dto.bank_code,
		bankAccountNumber: dto.bank_account_number,
		studentHash: dto.student_hash,
		// personalInformationConsent: dto.personal_information_consent,
		// personalInformationConsentDate: new Date(dto.personal_information_consent_date),
		createdAt: parseToFormattedDate(dto.created_at),
		updatedAt: parseToFormattedDate(dto.updated_at),
	};
};
