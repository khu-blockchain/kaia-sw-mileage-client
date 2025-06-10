import { Student } from "@/entities/student";

type signUpAPIRequest = {
  studentId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  walletAddress: string;
  bankAccountNumber: string;
  bankCode: string;
  personalInformationConsentStatus: number;
  rawTransaction: string;
  studentHash: string;
};

type signUpAPIResponse = Student;

type createWalletChangeAPIRequest = {
  studentId: string;
  rawTransaction: string;
};

type createWalletChangeAPIResponse = { message: string };

type confirmWalletChangeAPIRequest = {
  studentId: string;
  rawTransaction: string;
};

type confirmWalletChangeAPIResponse = { message: string };

export type {
  signUpAPIRequest,
  signUpAPIResponse,
  createWalletChangeAPIRequest,
  createWalletChangeAPIResponse,
  confirmWalletChangeAPIRequest,
  confirmWalletChangeAPIResponse,
};
