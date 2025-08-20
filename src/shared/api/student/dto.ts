import type { Address, Hex } from "@kaiachain/viem-ext";
import type { Student } from "./types";

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
	rawTransaction: Hex;
};

type SignUpResponse = Student;

type GetMeResponse = Student;

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
	SignUpRequest,
	SignUpResponse,
	GetMeResponse,
	CreateWalletChangeRequest,
	CreateWalletChangeResponse,
	ConfirmWalletChangeRequest,
	ConfirmWalletChangeResponse,
};
