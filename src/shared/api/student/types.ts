import type { TRANSACTION_STATUS } from "../enum";

type Student = {
	student_id: string;
	name: string;
	department: string;
	wallet_address: string;
	email: string;
	transaction_status: TRANSACTION_STATUS;
	bank_code: string;
	bank_account_number: string;
	student_hash: string;
	personal_information_consent: boolean;
	personal_information_consent_date: string;
	created_at: string;
	updated_at: string;
};

export type { Student };
