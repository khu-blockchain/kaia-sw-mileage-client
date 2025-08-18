import type { Address, RawTransaction } from "@/shared/lib/web3";
import type { TRANSACTION_STATUS } from "../enum";

type StudentResponse = {
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

type CreateWalletChangeRequest = {
	studentHash: string;
	rawTransaction: string;
};

type CreateWalletChangeResponse = {
	success: boolean;
};

type ConfirmWalletChangeRequest = {
	studentHash: string;
	rawTransaction: string;
};

type ConfirmWalletChangeResponse = {
	success: boolean;
};

export type {
	StudentResponse,
	SignUpRequest,
	SignUpResponse,
	CreateWalletChangeRequest,
	CreateWalletChangeResponse,
	ConfirmWalletChangeRequest,
	ConfirmWalletChangeResponse,
};
