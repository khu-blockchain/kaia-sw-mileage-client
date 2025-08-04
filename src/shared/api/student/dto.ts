import type { Address, RawTransaction } from "@/shared/lib/web3";
import type { TRANSACTION_STATUS } from "../enum";

type StudentResponse = {
	id: string;
	name: string;
	department: string;
	wallet_address: string;
	transaction_status: TRANSACTION_STATUS;
	bank_code: string;
	bank_account_number: string;
	personal_information_consent: boolean;
	personal_information_consent_date: Date;
	created_at: Date;
	updated_at: Date;
};

type SignUpRequest = {
	studentId: string;
	password: string;
	passwordConfirm: string;
	name: string;
	department: string;
	email: string;
	bankAccountNumber: string;
	bankCode: string;
	personalInformationConsentStatus: boolean;
	walletAddress: Address;
	studentHash: string;
	rawTransaction: RawTransaction;
};

type SignUpResponse = StudentResponse;

export type { StudentResponse, SignUpRequest, SignUpResponse };
